import React, {useState} from 'react'
import { Modal } from '../../../context/Modal'

import DeleteBooking from './DeleteBooking'

const DeleteBookingModal =({id}) => {
   const [showModal, setShowModal] =useState(false)

   return (
      <div className='delete-booking-modal-container'>
         <div className='delete-booking-modal-button-container' onClick={() => setShowModal(true)}>
            <p className='delete-booking-button'>Delete</p>
         </div>
         {showModal && 
         (<Modal onClose={() => setShowModal(false)}>
            <DeleteBooking id={id} setShowModal={setShowModal}/>
         </Modal>)}
      </div>      
   )
}

export default DeleteBookingModal