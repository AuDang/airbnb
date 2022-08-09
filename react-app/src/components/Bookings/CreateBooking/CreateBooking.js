import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {addBooking} from '../../../store/booking'
import {moment} from 'moment'
import {DateRange} from 'react-date-range'
import {addDays} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { dateArrayCreator } from '../../../utils/dateArray'

const CreateBooking = () => {
   const {id} = useParams()
   const history = useHistory()
   const dispatch = useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const spot = useSelector(state => (state.spots[id]))
   // console.log('spooot', spot )
   
   const bookings = useSelector(state => Object.values(state.bookingReducer))
   const spotBookings = bookings?.filter(booking => spot?.id === booking.spot_id)
   
   console.log('spotbookeee', spotBookings)
   // console.log('booking', bookings)


   const [guests, setGuests] = useState(1)
   const [startDate, setStartDate] = useState(new Date())
   const [today,setToday] = useState(new Date())
   const [endDate, setEndDate] = useState(addDays(new Date(), 2))
   const [errors, setErrors] = useState([])
   
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
      }
   ]);

   useEffect(()=> {
      setStartDate (state[0].startDate)
      setEndDate(state[0].endDate)
      // console.log(disabledDatesArray)
   },[state])


   console.log('DateState', state[0])

   const handleBooking = async (e) => {
   e.preventDefault()
   const booking = {
      spot_id: spot?.id,
      user_id: sessionUser?.id,
      guests: parseInt(guests),
      check_in:startDate.toISOString().split('T')[0],
      check_out:endDate.toISOString().split('T')[0],
   }
   const data = await dispatch(addBooking(booking))
   if(data?.errors) {
      setErrors(data.errors)
   } 
   // else if (data) {
   //    history.push(`/users/${sessionUser.id}/bookings`)
   // }
   }

   return (
      <div>
         <form className='create-booking-form-container' >
            <DateRange 
            onChange={(item) => setState([item.selection])}
            editableDateInputs={true}
            months={1}
            ranges={state}
            minDate={today}
            dragSelectionEnabled={true}
            // disabledDates={(disabledDatesArray)}
            />
            <button onClick={handleBooking}>Book</button>
         </form>
      </div>
   )
}

export default CreateBooking