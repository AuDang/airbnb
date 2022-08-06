import React, {useState} from 'react'
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
   const tomorrow = addDays(new Date (),1)
   const endDate = addDays(new Date(), 2)

   const sessionUser = useSelector(state => state.session.user)
   const spot = useSelector(state => state.spotReducer[id])

   const [guests, setGuests] = useState(1)
   const [checkin, setCheckin] = useState(tomorrow)
   const [checkout, setCheckout] = useState(endDate)
   const [errors, setErrors] = useState([])


   const [dateRange, setDateRange] = useState([
   {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
   }
   ]);

   
   const handleSubmit = async (e) => {
      e.preventDefault()
      const booking = {
         spot_id: spot.id,
         user_id: sessionUser.id,
         guests: parseInt(guests),
         check_in: checkin.format('YYYY-MM-DD'),
         checkout_out: checkout.format('YYYY-MM-DD')
      }
      const data = await dispatch(addBooking(booking))
      if(data.errors) {
         setErrors(data.errors)
      } else if (data) {
         history.push(`/users/${sessionUser.id}/bookings`)
      }
   }

   return (
      <div>
         <DateRange 
         onChange={item => setDateRange([item.selection])}
         editableDateInputs={true}
         months={1}
         ranges={dateRange}
         // direction="horizontal"
         />
      </div>
   )
}

export default CreateBooking