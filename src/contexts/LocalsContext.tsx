import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { useHistory } from "react-router"
import { database } from "../services/firebase"

type DeliveryInfo = {
  name: string,
  vol: string,
  obs: string
}

type CoordinatesType = {
  latitude: number,
  longitude: number
}

type ValueType = {
  coords: CoordinatesType | undefined,
  setDeliveryData: (name: string, volume:string, obs:string) => void,
  setDeliveryInfos: Dispatch<SetStateAction<DeliveryInfo | undefined>>,
  setLatLngOnContext: (lat: number, lng: number) => void | undefined
}

type LocalsContextProviderType = {
  children: ReactNode
}

export const LocalsContext = createContext({} as ValueType)

export function LocalsContextProvider(props: LocalsContextProviderType){
  const history = useHistory();
  const [coords, setCoords ] = useState<CoordinatesType>()
  const [deliveryInfos, setDeliveryInfos] = useState<DeliveryInfo>()

  function setLatLngOnContext(lat:  number, lng: number){
    setCoords({
     latitude: lat,
     longitude: lng
    })
  }

  function setDeliveryData(name: string, volume: string, obs:string){
    const n = name
    const v = volume
    const o = obs
    const i = {
      name: n,
      vol: v,
      obs: o
    }
    // setDeliveryInfos({
    //   name: n,
    //   vol: v,
    //   obs: o
    // })
    
    if (!coords?.latitude) {
      alert('Erro ao carregar endereço. Favor selecionar novamente.')
      return;
    }
    console.log('no context', deliveryInfos?.name, deliveryInfos?.obs, deliveryInfos?.vol, n, v, o, i)
    
    // saveDeliveryOnDatabase() 
  }

  if(coords?.latitude && deliveryInfos?.name){
    saveDeliveryOnDatabase() 
  }


  async function saveDeliveryOnDatabase(){
    const deliveriesRef = database.ref('deliveries');
    const firebaseDelivery = await deliveriesRef.push({
      title: deliveryInfos?.name,
      lat: coords?.latitude,
      long: coords?.longitude,
      vol: deliveryInfos?.vol,
      obs: deliveryInfos?.obs
    })

    alert(`Entrega criada. ID: ${firebaseDelivery.key}`)
    history.push('/home')

    setCoords({
      latitude: 0,
      longitude: 0
    })
  }



  return(
    <LocalsContext.Provider value={{ coords, setDeliveryData, setLatLngOnContext, setDeliveryInfos }}>
      {props.children}
    </LocalsContext.Provider>
  );

}