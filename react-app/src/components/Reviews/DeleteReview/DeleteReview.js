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
      <div className ='confirm-delete-container'>
         <div className='confirm-delete-header-container'>
            <h1 className='confirm-delete-header'>Delete Review?</h1>
         </div>
         <div className='confirm-delete-text-container'>
            <span>
               <p className='confirm-delete-text-1'>Are you sure you want to delete this spot? </p>
            </span>
         </div>
         <div className='confirm-delete-button-container'>
            <button className='confirm-delete-button' onClick={handleDelete} >Confirm Delete</button>
         </div>

      </div>
   )
}

export default DeleteReview