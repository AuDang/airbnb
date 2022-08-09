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
      <div className ='confirm-delete-spot-container'>
         <div className='confirm-delete-spot-header-container'>
            <h1 className='confirm-delete-spot-header'>Delete Booking?</h1>
         </div>
         <div className='confirm-delete-spot-text-container'>
            <p className='confirm-delete-spot-text-2'> This action is irreversible </p>
            <span>
               <p className='confirm-delete-spot-text-1'>Are you sure you want to delete this Booking? </p>
            </span>
         </div>
         <div className='confirm-delete-spot-button-container'>
            <button className='confirm-delete-spot-button' onClick={handleDelete} >Confirm Delete</button>
         </div>

      </div>
   )
}

export default DeleteBooking