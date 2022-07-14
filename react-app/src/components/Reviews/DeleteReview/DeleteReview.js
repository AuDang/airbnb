import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/review";


import './DeleteReview.css'

const DeleteReview =({id, setShowModal}) => {
   const dispatch = useDispatch()

   const handleDelete = async (e) => {
      e.preventDefault()
      const data = await dispatch(deleteReview(id))
      // console.log('reviewid', id)
      if (data) {
         setShowModal(false)
      }
   }

   return (
      <div className ='confirm-delete-spot-container'>
         <div className='confirm-delete-spot-header-container'>
            <h1 className='confirm-delete-spot-header'>Delete Review?</h1>
         </div>
         <div className='confirm-delete-spot-text-container'>
            <p className='confirm-delete-spot-text-2'> This action is irreversible </p>
            <span>
               <p className='confirm-delete-spot-text-1'>Are you sure you want to delete this spot? </p>
            </span>
         </div>
         <div className='confirm-delete-spot-button-container'>
            <button className='confirm-delete-spot-button' onClick={handleDelete} >Confirm Delete</button>
         </div>

      </div>
   )
}

export default DeleteReview