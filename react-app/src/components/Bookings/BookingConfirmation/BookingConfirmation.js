import React,{ useEffect, useState } from "react";
import { useHistory, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const BookingConfirmation = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const spots = useSelector(state => Object.values(state.spots))
   console.log('spots',spots)
   
   // const spotBooking = spots?.find((spot) => parseInt(spot_id) === spot.id)

   return (
      <div>
         
      </div>
   )
}

export default BookingConfirmation