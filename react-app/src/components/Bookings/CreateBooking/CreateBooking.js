import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {addBooking} from '../../../store/booking'
import moment from 'moment'
import {DateRangePicker} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CreateBooking = () => {
   const {id} = useParams
   const history = useHistory()
   const dispatch = useDispatch()
   const tomorrow = moment().add(1, 'days')
   const endDate = moment(tomorrow).add( 2, 'days')
   const sessionUser = useSelector(state => state.session.user)
   const spot = useSelector(state => state.spotReducer[id])
   const [guests, setGuests] = useState(1)
   const [checkin, setCheckin] = useState(tomorrow)
   const [checkout, setCheckout] = useState(endDate)
   const [errors, setErrors] = useState([])

   const handleSubmit = async (e) => {
      e.preventDefault()
      const booking = {
         spot_id: spot.id,
         user_id: sessionUser.id,
         guests: parseInt(guests),
         check_in: checkin.format('MM-DD-YYYY'),
         checkout_out: checkout.format('MM-DD-YYYY')
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
         
      </div>
   )
}

export default CreateBooking