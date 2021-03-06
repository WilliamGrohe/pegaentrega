import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type DeliveryFirebase = Record<string, {
  id: string;
  lat: number;
  long: number;
  title: string;
  vol: string;
  adress: string;
  inRoad?: boolean;
  finished: boolean;
}>

type Delivery = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  adress: string;
  volumes: string;
  inRoad?: boolean;
  finished: boolean;
}

function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])

  useEffect(() => {
    const deliveryRef = database.ref('deliveries')
    deliveryRef.on('value', snapshot => {

      const databaseDelivery = snapshot.val()
      const firebaseDeliveries: DeliveryFirebase = databaseDelivery ?? {};

      const parsedDeliveries = Object.entries(firebaseDeliveries).map(([key, value]) => {
        return {
          id: key,
          lat: value.lat,
          lng: value.long,
          name: value.title,
          volumes: value.vol,
          adress: value.adress,
          inRoad: value.inRoad,
          finished: value.finished
        }
      })
  
      setDeliveries(parsedDeliveries)

    })
  }, [])

  return deliveries
}

async function handleDeleteDelivery(deliveryId: string, name: string){
  if(window.confirm(`Tem certeza que deseja remover a entrega de ${name}?`)){
      await database.ref(`deliveries/${deliveryId}`).remove()
  }
}

async function handleUpdateInRoadDelivery(deliveryId: string, value: boolean) {
  const updates = {inRoad: value}

  await database.ref(`deliveries/${deliveryId}/`).update(updates)
}

async function handleUpdateFinishedDelivery(deliveryId: string, value: boolean) {
  const updates = {finished: value}

  await database.ref(`deliveries/${deliveryId}/`).update(updates)
}

export { handleDeleteDelivery, handleUpdateInRoadDelivery, handleUpdateFinishedDelivery, useDeliveries}

