import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import { removeSpot } from "../../store/spot";
import './DeleteSpot.css'

const DeleteSpot = () => {
   const {id} = useParams()
   const dispatch = useDispatch()
   const history = useHistory()

   const handleDelete = async(e) => {
      e.preventDefault()
      const data = await dispatch(removeSpot(id))
      if (data) {
         history.push(`/`)
      }
   }
   return (
      <div className ='confirm-delete-container'>
         <div className='confirm-delete-header-container'>
            <h1 className='confirm-delete-header'>Delete Spot?</h1>
         </div>
         <div className='confirm-delete-text-container'>
            {/* <p className='confirm-delete-text-2'> This action is irreversible </p> */}
            <span>
               <p className='confirm-delete-text-1'>Are you sure you want to delete this spot? </p>
            </span>
         </div>
         <div className='confirm-delete-button-container'>
            <button className='confirm-delete-button' onClick={handleDelete} >Confirm</button>
         </div>

      </div>
   )
}

export default DeleteSpot 