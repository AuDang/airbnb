import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {addBooking} from '../../../store/booking'
// import moment from 'moment'
import {DateRange} from 'react-date-range'
import {addDays} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CreateBooking = () => {
   const {id} = useParams
   const history = useHistory()
   const dispatch = useDispatch()
   // const tomorrow = addDays(new Date (),1)
   // const endDate = addDays(new Date(), 2)

   const sessionUser = useSelector(state => state.session.user)
   const spot = (useSelector(state => state.spots))
   console.log('spooot', spot )
   
   const [guests, setGuests] = useState(1)
   const [check_in, setCheck_in] = useState(new Date())
   const [check_out, setCheck_out] = useState(addDays(new Date(), 3))
   const [errors, setErrors] = useState([])
   console.log(typeof startDate)

   const [dateRange, setDateRange] = useState([
   {
      startDate: check_in,
      endDate: check_out,
      key: 'selection'
   }
   ]);
      console.log('start', dateRange.startDate)
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      const booking = {
         spot_id: spot.id,
         user_id: sessionUser.id,
         guests: parseInt(guests),
         check_in,
         check_out
      }
      const data = await dispatch(addBooking(booking))
      if(data?.errors) {
         setErrors(data.errors)
      } else if (data) {
         history.push(`/users/${sessionUser.id}/bookings`)
      }
   }

   return (
      <div>
         <form className='create-booking-form-container' onSubmit={handleSubmit}>
            <DateRange 
            onChange={item => setDateRange([item.selection])}
            editableDateInputs={true}
            months={1}
            // ranges={dateRange}
            // startDate={startDate}
            // endDate={endDate}
            // direction="horizontal"
            />
            <button>Book</button>
         </form>
      </div>
   )
}

export default CreateBooking