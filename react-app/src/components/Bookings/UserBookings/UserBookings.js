import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getUserBookings } from '../../../store/booking'


const UserBookings = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const {id} = useParams()
   const bookings = useSelector(state => state.bookingReducer)
   console.log('bookings', bookings)
   const sessionUser = useSelector(state => state.session.user)
   console.log('sessionUser', sessionUser)
   const spots = useSelector(state => state.spots)
   console.log('spots', spots)


   useEffect(async () => {
      if (sessionUser) {
         await dispatch(getUserBookings(id))
      }
   },[dispatch, sessionUser])


   // if(sessionUser?.id !== id) {
   //    history.push('/404-Page-Not-Found')
   // }


   return (
      <div>
         HEEEELLLOOOOOOOOO
      </div>
   )
}

export default UserBookings