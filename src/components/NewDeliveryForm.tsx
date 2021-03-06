import { FormEvent, useContext, useState } from "react"
import { LocalsContext } from '../contexts/LocalsContext'

export function NewDeliveryForm() {
  const [newNameDelivery, setNewNameDelivery] = useState('')
  const [newVolumeDelivery, setNewVolumeDelivery] = useState('')
  const [newObsDelivery, setNewObsDelivery] = useState('')
  const [newDeliveryDate, setNewDeliveryDate] = useState('')
  
  const {setDeliveryInfos} = useContext(LocalsContext)
  
  function handleCreateDelivery(e: FormEvent){
    e.preventDefault();

    if (newNameDelivery.trim() === '') {
      alert('Preencher nome da entrega!')
      return;
    }

    alert(newDeliveryDate)
    setDeliveryInfos({
      name:newNameDelivery,
      vol: newVolumeDelivery,
      obs: newObsDelivery,
      date: newDeliveryDate,
      finished: false,
      inRoad: false
    })
  }


  return(
  <>
  <form id="formulario" onSubmit={handleCreateDelivery}>
          <input
            type="text"
            placeholder="Nome/Empresa:"
            onChange={event => setNewNameDelivery(event.target.value)}
            value={newNameDelivery}
          />
          <input
            type="text"
            placeholder="Volumes:"
            onChange={event => setNewVolumeDelivery(event.target.value)}
            value={newVolumeDelivery}
          />
          <input
            type="text"
            placeholder="Observação:"
            onChange={event => setNewObsDelivery(event.target.value)}
            value={newObsDelivery}
          />
          <input 
            type="date" 
            name="date" 
            id="date"
            onChange={event => setNewDeliveryDate(event.target.value)}
            />
          <button type="submit">
            Salvar
          </button>
        </form>
  </>
  )
}