import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import DeleteSpot from './DeleteSpot'

const DeleteSpotModal = ({id}) => {
   const [showModal, setShowModal] =useState(false)

   return (
      <div className='delete-review-modal-container'>
         <div className='delete-review-modal-button-container' onClick={() => setShowModal(true)}>
            <p>Delete</p>
         </div>
         {showModal && 
         (<Modal onClose={() => setShowModal(false)}>
            <DeleteSpot id={id} setShowModal={setShowModal}/>
         </Modal>)}
      </div>
   )
}

export default DeleteSpotModal