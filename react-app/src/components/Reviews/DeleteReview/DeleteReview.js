import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/review";


import './DeleteReview.css'

const DeleteReview =({id, setShowModal}) => {
   const dispatch = useDispatch()

   const handleDelete = async (e) => {
      e.preventDefault()
      const data = await dispatch(deleteReview(id))
      if (data) {
         setShowModal(false)
      }
   }

   return (
      <div className ='confirm-delete-review-container'>
         <div className='confirm-delete-review-header-container'>
            <h1 className='confirm-delete-review-header'>Delete Review?</h1>
         </div>
         <div className='confirm-delete-review-text-container'>
            <p className='confirm-delte-review-text'>Are you sure you want to delte this review? This action is irreversible </p>
         </div>
         <div className='confirm-delete-review-button-container'>
            <button className='confirm-delete-review-button-container' onClick={handleDelete} >Confirm Delete</button>
         </div>

      </div>
   )
}

export default DeleteReview