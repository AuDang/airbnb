import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import { removeSpot } from "../../store/spot";

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
      <>
      <button onClick={handleDelete}>Delete</button>
      </>
   )
}

export default DeleteSpot 