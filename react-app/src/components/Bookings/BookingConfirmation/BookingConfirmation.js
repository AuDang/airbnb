import React,{ useEffect, useState } from "react";
import { useHistory, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from "../../../store/booking";
import { addDays } from 'date-fns';
import "./BookingConfirmation.css"

const BookingConfirmation = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const spots = useSelector((state) => Object.values(state.spots))
   // console.log('spots',spots)
   const [user_id, setSessionUserId] = useState("");
   const [spot_id, setSpotId] = useState("");
   const [guests, setGuest] = useState();
   const [check_in, setCheckIn] = useState("");
   const [check_out, setCheckOut] = useState("");
   const [nights, setNights] = useState("")
   const sessionUser = useSelector((state) => Object.values(state.session));
   const [errors, setErrors] = useState([])

   // console.log('sessionUser',sessionUser)


   const spotBooking = spots?.find(
      (spot) => parseInt(spot_id) === spot.id)
   // console.log('spotBooking', spotBooking)

   const booking = {user_id, spot_id, guests, check_in, check_out, nights}
   console.log('booking', booking)

   const { search } = useLocation();

   const queryParamsArray = search.split("&");
   let newParams = [];

   queryParamsArray.map((keyValue) => {
      newParams.push(keyValue.toString());
   });

   useEffect(() => {
   const newestParams = newParams.forEach((keyValue) => {
   if (keyValue.split("=")[0] === "?user_id") {
      setSessionUserId(keyValue.split("=")[1]);
   }
   if (keyValue.split("=")[0] === "spot_id") {
      setSpotId(keyValue.split("=")[1]);
   }
   if (keyValue.split("=")[0] === "guests") {
      setGuest(keyValue.split("=")[1]);
   }
   if (keyValue.split("=")[0] === "check_in") {
      setCheckIn(keyValue.split("=")[1]);
   }
   if (keyValue.split("=")[0] === "check_out") {
      setCheckOut(keyValue.split("=")[1]);
   }
   if (keyValue.split("=")[0] === "nights") {
      setNights(keyValue.split("=")[1]);
   }
   });
   }, []);

// console.log('NewParams', check_out)

   const goBack = (e) => {
      return history.goBack()
   }

   const handleConfirm = async (e) => {
      e.preventDefault()
      const payload = {user_id, spot_id, guests, check_in, check_out, nights};
      const data = await dispatch(addBooking(payload))
      if (data?.errors) {
         setErrors(data.errors)
      } else if (data) {
         history.push(`/users/${sessionUser[0]?.id}/bookings`)
      }
   }


   return (
      <div className='confirmation-page'>
         <div className='confirm-container'>
            <div className='confirm-back-button'>
               <i className="fa fa-angle-left" aria-hidden="true" onClick={goBack}></i>
               <h1>Request to book</h1>
            </div>

            <div className='confirm'>
               <div className='confirm-left'>
                  <div className='confirmation-info-container'>
                     <h1>Your Trip</h1>
                     <h2 className='confirm-left-headers'>Dates</h2>
                     <div>{addDays(new Date(check_in), 1).toDateString().split(" ").splice(1).join(' ')} - {addDays(new Date(check_out), 1).toDateString().split(" ").splice(1).join(' ')}</div>
                     <h2 className='confirm-left-headers'>Guests</h2>
                     <div>{guests} guest</div>
                  </div>
                  <div>
                     <button className='confirm-button' onClick={handleConfirm}>Reserve</button>
                  </div>
               </div>


               <div className='confirm-right'>
                  <div className='confirm-image-container'>
                     <img className='confirm-image'src={spotBooking?.images[0].image}></img>
                     <div className="confirm-name">
                        {/* <p>Home</p> */}
                        <h3>{spotBooking?.name}</h3>
                     </div>
                  </div>

                  <div className='confirm-price-container'>
                     <h1 className='confirm-header'>Price details</h1>
                     <div className='confirm-booking-fee'>
                        <div>${spotBooking?.price} x {nights} nights</div>
                        <div>${(spotBooking?.price * nights).toLocaleString()}</div>
                     </div>
                     <div className='confirm-booking-fee'>
                        <div>Cleaning fee</div>
                        <div>${((spotBooking?.price * nights * .06)).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                     </div>
                     <div className='confirm-booking-fee'>
                        <div>Service fee</div>
                        <div>${((spotBooking?.price * nights * .07)).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                     </div>
                     <div className='confirm-booking-fee'>
                        <div>Occupancy fee</div>
                        <div>${((spotBooking?.price * nights * .03)).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                     </div>
                     <div className='confirm-booking-total'>
                        <div>Total (USD)</div>
                        <div>${((spotBooking?.price * nights * .16) +((spotBooking?.price * nights))).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                     </div>
                  </div>
               </div>
            </div>

         </div>

      </div>
   )
}

export default BookingConfirmation