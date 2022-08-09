import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {addBooking} from '../../../store/booking'
import {DateRange} from 'react-date-range'
import {addDays} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { IoDiamond } from 'react-icons/io5';
import { dateArrayCreator } from '../../../utils/dateArray'
import './CreateBooking.css'

const CreateBooking = ({reviews}) => {
   const {id} = useParams()
   const history = useHistory()
   const dispatch = useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const spot = useSelector(state => (state.spots[id]))
   console.log('spot', spot)
   
   const bookings = useSelector(state => Object.values(state.bookingReducer))
   const spotBookings = bookings?.filter(booking => spot?.id === booking.spot_id)
   // console.log()
   console.log('spotbookeee', spotBookings)

   const [guests, setGuests] = useState(1)
   const [startDate, setStartDate] = useState(new Date())
   const [today,setToday] = useState(new Date())
   const [endDate, setEndDate] = useState(addDays(new Date(), 2))
   const [errors, setErrors] = useState([])
   
   const filteredReviews = reviews.filter(({spot_id}) => spot_id === +id)
   let sum = 0;
   filteredReviews.forEach(({rating}) => {
      sum+= rating
   })
   const averageReviews = sum /filteredReviews.length
   let roundedAverage = (Math.round(averageReviews * 100) /100).toFixed(1)
   if (Number.isNaN(roundedAverage)) {
      roundedAverage = "Unrated"
   }


   let disabledDatesArray = []

   // const dateArrayCreator = (startDate, stopDate) => {
   //    const dateArray = new Array();
   //    const currentDate = startDate;
   //    while (currentDate <= stopDate) {
   //       dateArray.push(new Date (currentDate));
   //       currentDate = addDays(currentDate, 1);
   //    }
   // return dateArray
   // }
   // spotBookings?.forEach(booking => {
   //    (dateArrayCreator(addDays(new Date (booking?.check_in),1), addDays(new Date (booking?.end_date),1))).forEach(date => {
   //       disabledDatesArray.push(date)
   //    })
   // })
   // console.log('datearraytest', dateArrayCreator(startDate, endDate))



   const [state, setState] = useState([
		{
      startDate: startDate,
      endDate: endDate,
      key: "selection",
      color: '#ff627f'
      }
   ]);

   useEffect(()=> {
      setStartDate (state[0].startDate)
      setEndDate(state[0].endDate)
      // console.log(disabledDatesArray)
   },[state])

   console.log('DateState', state[0])

   const totalPrice = (date1,date2) => {
      let oned = 24 * 60 * 60 * 1000;
      const days = Math.ceil((date2-date1) /oned)
      return (spot?.price * days)
   }

   const totalNights = (date1,date2) => {
      let oned = 24 * 60 * 60 * 1000;
      const days = Math.ceil((date2-date1) /oned)
      return days
   }

   const cleaningFees = (spot?.price * totalNights(startDate, endDate) * 0.06);
   const serviceFees = (spot?.price * totalNights(startDate, endDate) * 0.07);
   const occupancyFees = (spot?.price * totalNights(startDate, endDate)* 0.03)

   console.log('fee1', serviceFees)
   console.log('fee2', cleaningFees)
   console.log('fee3', occupancyFees)


   const handleBooking = async (e) => {
   e.preventDefault()
   const booking = {
      spot_id: spot?.id,
      user_id: sessionUser?.id,
      guests: parseInt(guests),
      check_in:startDate.toISOString().split('T')[0],
      check_out:endDate.toISOString().split('T')[0],
      nights: totalNights(startDate, endDate)
   }
   const data = await dispatch(addBooking(booking))
   if(data?.errors) {
      setErrors(data.errors)
   } 
   else if (data) {
      history.push(`/users/${sessionUser.id}/bookings`)
   }
   }

   return (
      <div className='create-booking-container'>
         <div className='create-booking-top'>
               <div className='create-booking-price'>
                  ${spot.price} night
               </div>
               <div className='create-booking-reviews'>
                  <div className='booking-diamond'>
                     <IoDiamond color='purple'/> {roundedAverage} 
                  </div>
                  <div>
                     {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
                  </div>
            </div>
         </div>
         <form className='create-booking-form-container' >
            <DateRange 
            onChange={(item) => setState([item.selection])}
            editableDateInputs={true}
            months={1}
            ranges={state}
            minDate={today}
            dragSelectionEnabled={true}
            />
            {/* <div className='create-booking-form-guests-container'>
               <label>Guests</label>
                  <select defaultValue={guests} onChange={(e) => setGuests(e.target.value)}>
                     {[...Array(spot.guest).keys()].map((number, i) => (
                        <option key={i}>{number + 1}</option>
                     ))}
                  </select>
            </div> */}
         </form>
            <p className='create-booking-text'>You won't be charged yet</p>
            <button className='create-booking-button'onClick={handleBooking}>Reserve</button>
         <div className='create-booking-info'>
            <div className='create-booking-fee-container'>
               <div className='create-booking-fees'>
                  <div>${spot?.price} x {totalNights(startDate, endDate)} nights </div>
                  <div>${totalPrice(startDate, endDate).toLocaleString()}</div>
               </div>

               <div className='create-booking-fees'>
                  <div>Cleaning fee</div>
                  <div>${cleaningFees.toFixed(2)}</div>
               </div>

               <div className='create-booking-fees'>
                  <div>Service fee</div>
                  <div>${serviceFees.toFixed(2)}</div>
               </div>

               <div className='create-booking-fees'>
                  <div>Occupany fee</div>
                  <div>${occupancyFees.toFixed(2)}</div>
               </div>
            </div>

            <div className='create-booking-total'>
               <div>Total before taxes</div>
               <div>${(cleaningFees + serviceFees + occupancyFees + totalPrice(startDate, endDate)).toLocaleString(undefined, {minimumFractionDigits: 2})} </div>
            </div>
         </div>
      </div>
   )
}

export default CreateBooking