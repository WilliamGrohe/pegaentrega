import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { database } from "../services/firebase"

type DeliveryInfo = {
  name: string,
  vol: string,
  obs: string,
  adress?: string, 
  date: string,
  finished: boolean,
  inRoad: boolean
}

type CoordinatesType = {
  latitude: number,
  longitude: number,
  adress?: string
}

type ValueType = {
  coords: CoordinatesType | undefined,
  setDeliveryInfos: Dispatch<SetStateAction<DeliveryInfo | undefined>>,
  setLatLngOnContext: (lat: number, lng: number, adress: string) => void | undefined
}

type LocalsContextProviderType = {
  children: ReactNode
}

export const LocalsContext = createContext({} as ValueType)

export function LocalsContextProvider(props: LocalsContextProviderType){
  const history = useHistory();
  const [coords, setCoords ] = useState<CoordinatesType>()
  const [deliveryInfos, setDeliveryInfos] = useState<DeliveryInfo>()

  function setLatLngOnContext(lat:  number, lng: number, adress: string){
    setCoords({
     latitude: lat,
     longitude: lng,
     adress: adress
    })

    console.log(adress)
  }

  useEffect(()=>{
    if(deliveryInfos && coords?.latitude !== 0){
      saveDeliveryOnDatabase()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deliveryInfos])
  

  async function saveDeliveryOnDatabase(){
    const deliveriesRef = database.ref('deliveries');
    const firebaseDelivery = await deliveriesRef.push({
      lat: coords?.latitude,
      long: coords?.longitude,
      adress: coords?.adress,
      title: deliveryInfos?.name,
      vol: deliveryInfos?.vol,
      obs: deliveryInfos?.obs,
      finished: deliveryInfos?.finished,
      inRoad: deliveryInfos?.inRoad
    })

    alert(`Entrega criada. ID: ${firebaseDelivery.key}`)
    history.push('/home')

    setCoords({
      latitude: 0,
      longitude: 0,
    })
  }

  return(
    <LocalsContext.Provider value={{ coords, setLatLngOnContext, setDeliveryInfos }}>
      {props.children}
    </LocalsContext.Provider>
  );

}