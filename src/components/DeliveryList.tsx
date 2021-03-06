import '../styles/deliveryList.scss'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Modal from 'react-modal'

import {
  handleDeleteDelivery,
  handleUpdateInRoadDelivery,
  handleUpdateFinishedDelivery
} from '../hooks/useDeliveries'

import trashIcon from '../assets/images/trash.svg'
import editIcon from '../assets/images/edit.svg'
import emRotaIcon from '../assets/images/em-rota.svg'
import emLojaIcon from '../assets/images/em-loja.svg'

type DeliveryProps = {
  id: string;
  lat?: number;
  lng?: number;
  inRoad?: boolean;
  name: string;
  volumes: string;
  adress: string;
  finished: boolean;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fefefe'
  },
};

export function DeliveryList({
  name,
  id,
  volumes,
  adress,
  inRoad,
  finished
}: DeliveryProps) {

  const { user } = useAuth()
  const [inRoadState, setInRoadState] = useState(false)
  const [finishedDeliveryState, setFinishedDeliveryState] = useState(finished)

  function removeDelivery(id: string, name: string) {
    handleDeleteDelivery(id, name)
  }

  let subtitle: HTMLSpanElement | null;

  // ----- Modal ----------

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal(id: string, name: string) {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle!.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // ------ Função carga carregada ------  
  function onLoadButton(){
    if(inRoad){
      return(
        <button id="onLoadBtn" className="btn-result" onClick={toggleInRoadBtn}>✓ Carregado</button>
      )
    } else {
      return(
        <button id="onLoadBtn" className="btn-load" onClick={toggleInRoadBtn}>Carregado</button>
      )
    }
  }

  function isInRoad() {
    if (inRoad) {
      return emRotaIcon
    } else {      
      return emLojaIcon
    }
  }


  function toggleInRoadBtn() {
    setInRoadState(prevRoad => !prevRoad)
    handleUpdateInRoadDelivery(id, inRoadState)
    isInRoad()
  }

  // ------ Função entrega finalizada ------
  function toggleFinishedDeliveryBtn() {
    setFinishedDeliveryState(prevFinished => !prevFinished)
    if (inRoad) {
      handleUpdateFinishedDelivery(id, finishedDeliveryState)
    } else {
      alert("Entrega não foi carregada na loja ainda.")
    }
  }

  // Listando as entregas de acordo com usuário logado
  // ----- e Status da Entrega ---------------------
  function handleUserInterface() {
    if (user?.name === "Televendas") {
      if (finished) {
        return (
          <>
            <td className="u-table-cell" colSpan={2} id="edit">
              ENTREGUE ÀS {volumes}
            </td>
          </>
        )
      }

      return (
        <>
          <td className="u-table-cell">Manha</td>
          <td className="u-table-cell" id="edit">
            <img src={isInRoad()} alt="Em rota de entrega" />
            <button className="btn-status" onClick={i => openModal(id, name)}><img src={editIcon} alt="Ver informações" /></button>
          </td>
        </>
      )
    }

    if (user?.name === "Motorista") {
      if (finished) {
        return (
          <>
            <td className="u-table-cell">
              <button className="btn-result" onClick={toggleFinishedDeliveryBtn}>✓ Entregue</button>
            </td>
            <td className="u-table-cell" id="edit">
              ENTREGUE ÀS {volumes}
            </td>
          </>
        )
      }

      return (
        <>
          <td className="u-table-cell">
            {onLoadButton()}
            <button className="btn-load" onClick={toggleFinishedDeliveryBtn}>Entregue</button>

          </td>
          <td className="u-table-cell" id="edit">
            <img src={isInRoad()} alt="Em rota de entrega" />
            <button className="btn-status" onClick={i => openModal(id, name)}><img src={editIcon} alt="Ver informações" /></button>
          </td>
        </>
      )
    }
  }

  return (
    <>
      <tr className="">
        <td className="u-table-cell" id="name"><h4>{name}</h4></td>
        <td className="u-table-cell" id="vol">{volumes}<br />
        </td>
        <td className="u-table-cell">{adress}<br />
        </td>
        {handleUserInterface()}
      </tr>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="close-modal" onClick={closeModal}>X</button>
        <h3 >Detalhes da entrega de <span ref={(_subtitle) => (subtitle = _subtitle)}>{name}</span></h3>
        <div>Observações:</div>
        <div className="div-obs">{adress}</div>
        <div className="modal-actions">
          <button className="btn-delete" onClick={i => removeDelivery(id, name)}>
            <img src={trashIcon} alt="Lixeira" />
          </button>
          <img src={isInRoad()} alt="Em rota de entrega" />
        </div>

      </Modal>
    </>
  )

}