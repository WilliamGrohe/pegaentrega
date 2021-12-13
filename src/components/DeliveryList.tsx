import '../styles/deliveryList.scss'

import { handleDeleteDelivery } from '../hooks/useDeliveries'
import trashIcon from '../assets/images/trash.svg'

type DeliveryProps = {
  id: string;
  lat?: number;
  lng?: number;
  name: string;
  volumes: string;
  adress: string;
}

function removeDelivery(id: string, name: string){
  handleDeleteDelivery(id, name)
}

export function DeliveryList({
  name,
  id,
  volumes,
  adress
}: DeliveryProps) {

  return (
    <tr className="row-list">
      <td className="u-table-cell"><h4>{name}</h4></td>
      <td className="u-table-cell">{volumes}<br/>
      </td>
      <td className="u-table-cell">{adress}<br/>
      </td>
      <td className="u-table-cell">Manha</td>
      <td className="u-table-cell"><button className="btn-delete" onClick={i => removeDelivery(id, name)}><img src={trashIcon} /></button></td>
    </tr>
  )
}