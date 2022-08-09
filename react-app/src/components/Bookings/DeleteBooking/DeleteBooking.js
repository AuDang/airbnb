import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteBooking } from '../../../store/booking'

const DeleteBooking =({setShowModal, id}) => {
   const dispatch =useDispatch()

   const handleDelete = async (e) => {
      e.preventDefault()
      const data = await dispatch(deleteBooking(id))
      if (data) {
         setShowModal(false)
      }
   }

   return (
      <div className ='confirm-delete-container'>
         <div className='confirm-delete-header-container'>
            <h1 className='confirm-delete-header'>Cancel Booking?</h1>
         </div>
         <div className='confirm-delete-text-container'>
               <p className='confirm-delete-text-1'>Are you sure you want to cancel this Booking? </p>
         </div>
         <div className='confirm-delete-button-container'>
            <button className='confirm-delete-button' onClick={handleDelete} >Cancel Booking</button>
         </div>

      </div>
   )
}

export default DeleteBooking