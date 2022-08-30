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
import {
  checkIn,
  dedicatedWorkspace,
  freeTV,
  kitchen,
  newIcon,
  parking,
  secCams,
  washer,
  wifi,
  littleStar,} from '../Navicons'
  import house1 from '../../static/house1.jpg'
import './SpotDetails.css'



const SpotDetails = () => {
   const {id} = useParams()
   const sessionUser = useSelector(state =>state.session.user)
   // console.log('sessionUser', sessionUser)
   const spot = useSelector(state => state?.spots[id])
   // console.log('spotOwner', spot)
   const reviews = Object.values(useSelector(state => state.reviewReducer))
   // console.log("reviews", reviews)
   const history = useHistory()
   const dispatch = useDispatch()

  
   useEffect( async () => {
      await dispatch(getSpot(id))
   },[dispatch])

   if( spot === undefined) {
      history.push('/404-Page-Not-Found')
   }

   const filteredReviews = reviews.filter(({spot_id}) => spot_id === +id)
   let sum = 0;
   filteredReviews.forEach(({rating}) => {
      sum+= rating
   })
   const averageReviews = sum /filteredReviews.length
   let roundedAverage = (Math.round(averageReviews * 100) /100)
   if (Number.isNaN(roundedAverage)) {
      roundedAverage = "Unrated"
   } else roundedAverage = (Math.round(averageReviews * 100) /100).toFixed(1)

   console.log('filtered', filteredReviews)

   const mappedReviews = filteredReviews.map((review) => review.user_id)
   console.log('mapped', mappedReviews)


   return (
      <div className='spot-details-container'>
         <div className='spot-detail-name-container'>
            <h1 className='spot-detail-name'>{spot?.name}</h1>
         </div>
            <div className='spot-detail-review-location-container'>
               <div className='spot-detail-diamond'>
                  <IoDiamond color='purple'/> {roundedAverage} 
               </div>
               <div className='spot-detail-reviews'>
                  {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
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
            {/* {console.log('spotimages', spot.images.length)} */}
            {spot.images.length < 1? <img className={`spot-detail-image-0`} src={house1}/>: 
         <div className='spot-detail-images'>
            {spot?.images.map(({ image }, idx) => (
               <img className={`spot-detail-image-${idx}`} src={image} key={idx} alt="new" />
               ))}
         </div>
            }

         <div className='spot-detail-mid'>
            <div className='spot-detail-mid-left'>
               <div className='spot-detail-host'>
                  <h1>Hosted by: {spot?.firstname} {spot?.lastname}</h1>
                  <p>{spot?.guest} Guests · {spot?.bedroom}  Bedrooms · {spot?.bathroom} Bathrooms</p>
               </div>

               <div className='spot-detail-description-container'>
                  <h1>Description</h1>
                  <p>{spot?.description}</p>
               </div>

            <div className="ammeneties">
              <div className='spot-detail-ammeneties-container'>
                <h1 className='spot-detail-ammeneties'>What this place offers</h1>
              </div>
              <div className="ammeneties-icon-container">
                <div className="ammeneties-icons">
                  {dedicatedWorkspace}{" "}
                  <div className="ammeneties-title">Dedicated Workspace</div>
                </div>
                <div className="ammeneties-icons">
                  {checkIn}{" "}
                  <div className="ammeneties-title">
                    Self check-in with smart lock
                  </div>
                </div>
                <div className="ammeneties-icons">
                  {secCams}{" "}
                  <div className="ammeneties-title">
                    Security cameras on property
                  </div>
                </div>
                <div className="ammeneties-icons">
                  {washer} <div className="ammeneties-title">Free washer – In unit</div>
                </div>
                <div className="ammeneties-icons">
                  {freeTV}{" "}
                  <div className="ammeneties-title">
                    HDTV with Amazon Prime Video, Fire TV, Netflix, premium
                    cable
                  </div>
                </div>
                <div className="ammeneties-icons">
                  {parking}{" "}
                  <div className="ammeneties-title">Free parking on premises</div>
                </div>
                <div className="ammeneties-icons">
                  {wifi} <div className="ammeneties-title">Free Wifi</div>
                </div>
                <div className="ammeneties-icons">
                  {kitchen} <div className="ammeneties-title">Kitchen</div>
                </div>
              </div>
            </div>


            </div>
            <div className='spot-detail-mid-right'>
               <div className='spot-detail-booking'>
                     <CreateBooking reviews={reviews}/>
               </div>
            </div>
         </div>


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

               {/* {filteredReviews.map(({review},idx) => ( */}
               <div className='spot-detail-create-review-button'>
                  {/* {console.log('sessionUser', sessionUser.id)}
                  {console.log('mappedUser', mappedReviews.includes(sessionUser.id))} */}
                  {mappedReviews?.includes(sessionUser?.id)? null : sessionUser?.id===spot?.user_id ? null :sessionUser ? <CreateReviewModal/>: null}

               </div>
               {/* // ))} */}
            </div>
            <div className='show-details-all-reviwews-container'>
               <ShowReview />
            </div>
         </div>
      </div>
   )
}

export default SpotDetails 