import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getUserBookings } from '../../../store/booking'
import DeleteBookingModal from '../DeleteBooking'

import "./UserBookings.css"


const UserBookings = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const {id} = useParams()
   const sessionUser = useSelector((state) => state.session.user)

   const bookings = Object.values(useSelector(state => state.bookingReducer)).reverse()
   // console.log('bookings', bookings)
   const spots = useSelector(state => state.spots)
   // console.log('spotsss', spots[id].price)
   // console.log('id',id)

   const totalPrice = (night, price) => {
      return (night * price)
   }

   useEffect(async () => {
      if (sessionUser) {
         await dispatch(getUserBookings(sessionUser.id))
      }
   },[dispatch, sessionUser])


   if(sessionUser.id !== +id) {
      history.push('/404-Page-Not-Found')
   }

   return (
      <div>
         {bookings.length >=1 && (
            <div className='bookings-page'>
               <div className='bookings-title'>
                  <h1> Your Bookings</h1>
               </div>

               <div className='bookings-container'>
                  {bookings.map((booking) => (
                     <div key={booking.id}>
                        <div className='booking-card'>
                           <div className='booking-image-container'>
                              <Link to= {`/spots/${spots[booking.spot_id].id}`}>
                                 <img
                                    className='each-booking-image'
                                    src={spots[booking.spot_id].images[0].image}
                                    alt={`spots #${booking.spot_id}`}
                                 >
                                 </img>
                              </Link>
                           </div>
                           <div className='booking-info'>
                              <div className='booking-name'>
                                 {spots[id]?.name}
                              </div>
                              <div className='booking-date'>
                                 Check in: {booking.check_in.slice(0,16)}
                              </div>
                              <div className='booking-date'>
                                 Check out: {booking.check_out.slice(0,16)}
                              </div>

                              <div className='booking-price-night-container'>
                                 <div className='booking-info-left'>
                                    <div className='booking-price'>
                                       ${spots[id].price}/Night
                                    </div>
                                    <div className='booking-nights'>
                                       Total Nights: {booking.nights}
                                    </div>
                                    <div className='booking-total-price'>
                                       Total Price: ${totalPrice(spots[id].price, booking.nights)}
                                    </div>
                                 </div>

                                 <div className='booking-info-right'>
                                    <DeleteBookingModal id={booking.id}/>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}

export default UserBookings