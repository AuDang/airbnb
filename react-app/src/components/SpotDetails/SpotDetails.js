import React, { useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSpot } from '../../store/spot';
import EditSpotModal from '../EditSpot';
import CreateReviewModal from '../Reviews/CreateReview';
import DeleteSpotModal from '../DeleteSpot';
import ShowReview from '../Reviews/ShowReview/ShowReview';
import { IoDiamond } from 'react-icons/io5';
import CreateBooking from '../Bookings/CreateBooking/CreateBooking';
import './SpotDetails.css'

import {DateRange} from 'react-date-range'
import {addDays} from 'date-fns'
import {addBooking} from '../../store/booking'

const SpotDetails = () => {
   const {id} = useParams()
   const sessionUser = useSelector(state =>state.session.user)
   const spot = useSelector(state => state?.spots[id])
   // console.log('spotDetails', spot.id)
   const reviews = Object.values(useSelector(state => state.reviewReducer))
   // console.log('review', reviews)
   // const bookings =Object.values(useSelector(state => state.bookingReducer))
   // console.log('booking', bookings)

   const history = useHistory()
   const dispatch = useDispatch()

//////////////////////////////////////////////////////////////
//    const bookings = useSelector(state => state.bookingReducer)
//    console.log('booking', bookings)

//    const [guests, setGuests] = useState(1)
//    const [startDate, setStartDate] = useState(addDays(new Date(),1))
//    const [endDate, setEndDate] = useState(addDays(new Date(), 3))
//    const [errors, setErrors] = useState([])


//    const selectionRange = {
//       startDate: startDate,
//       endDate: endDate,
//       key: "selection",
//    };

//    function handleSelect(ranges) {
//    setStartDate(ranges.selection.startDate);
//    setEndDate(ranges.selection.endDate);
//   }


//    const handleBooking = async (e) => {
//    e.preventDefault()
//    const booking = {
//       spot_id: spot?.id,
//       user_id: sessionUser?.id,
//       guests: parseInt(guests),
//       check_in:startDate.toISOString().split('T')[0],
//       check_out:endDate.toISOString().split('T')[0],
//    }
//    const data = await dispatch(addBooking(booking))
//    if(data?.errors) {
//       setErrors(data.errors)
//    } 
//    // else if (data) {
//    //    history.push(`/users/${sessionUser.id}/bookings`)
//    // }
//    }

   

   ///////////////////////////////////////////////////////////////////
  
   useEffect( async () => {
      await dispatch(getSpot(id))
   },[dispatch])

      // console.log('asdasdasdasd', spot_id)
   if( spot === undefined) {
      history.push('/404-Page-Not-Found')
   }

   const filteredReviews = reviews.filter(({spot_id}) => spot_id === +id)
   let sum = 0;
   filteredReviews.forEach(({rating}) => {
      sum+= rating
   })
   const averageReviews = sum /filteredReviews.length
   let roundedAverage = Math.round(averageReviews * 100) /100
   if (Number.isNaN(roundedAverage)) {
      roundedAverage = "Unrated"
   }




   return (
      <div className='spot-details-container'>
         <div className='spot-detail-name-container'>
            <h1 className='spot-detail-name'>{spot?.name}</h1>
         </div>
            <div className='spot-detail-review-location-container'>
               <div className='spot-detail-diamond'>
                  <IoDiamond color='purple'/> {roundedAverage} 
               </div>
               
               <div className='spot-detail-location'>
               {spot?.address}, {spot?.city}, {spot?.state}
               </div>
            </div>
            <div className='spot-details-edit-delete-container'>
               <div className='spot-details-edit'>
                  {sessionUser?.id === spot?.user_id && <EditSpotModal/>}
               </div>
               <div className='spot-details-delete'>
                  {sessionUser?.id === spot?.user_id && <DeleteSpotModal/>}
               </div>
            </div>
         <div className='spot-detail-images'>
            {spot?.images.map(({ image }, idx) => (
               <img className={`spot-detail-image-${idx}`} src={image} key={idx} alt="new" />
            ))}
         </div>


         <div className='spot-detail-host'>
            <h1>Hosted by: {spot?.firstname} {spot?.lastname}</h1>
            <p>{spot?.guest} Guests {spot?.bedroom} Bedrooms {spot?.bathroom} Bathrooms</p>
         </div>
         <div className='spot-detail-price'>
            <p>${spot?.price}/Night</p>
         </div>


         <div className='spot-detail-description-container'>
            <h1>Description</h1>
            <p>{spot?.description}</p>
         </div>
               <h1>Booking Component</h1>
                  {/* <form className='create-booking-form-container' >
                     <DateRange 
                     onChange={handleSelect}
                     editableDateInputs={true}
                     months={1}
                     ranges={[selectionRange]}
                     />
                     <button onClick={handleBooking}>Book</button>
                  </form> */}
               <CreateBooking />
               {/* <Calendar /> */}

         <div className='spot-detail-reviews-container'>
            <div className='spot-detail-rating-review-create-container'>
               <div className='spot-details-rating'>
                  <div className='spot-detail-rating-average-container'>
                     <p className='spot-detail-rating-average'> <IoDiamond color="purple"/> {roundedAverage}</p>
                  </div>
                  <div className='spot-detail-total-reviews'>
                     {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
                  </div>
               </div>
               <div className='spot-detail-create-review-button'>
                  {sessionUser && <CreateReviewModal/>}
               </div>
            </div>
            <div className='show-details-all-reviwews-container'>
               <ShowReview />
            </div>
         </div>
      </div>
   )
}

export default SpotDetails 