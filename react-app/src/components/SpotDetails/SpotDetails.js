import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getSpot } from '../../store/spot';
import EditSpotModal from '../EditSpot';
import CreateReviewModal from '../Reviews/CreateReview';
import DeleteSpot from '../DeleteSpot/DeleteSpot';
import DeleteSpotModal from '../DeleteSpot';
import ShowReview from '../Reviews/ShowReview/ShowReview';
import { IoDiamond } from 'react-icons/io5';
import './SpotDetails.css'

const SpotDetails = () => {
   const {id} = useParams()
   const sessionUser = useSelector(state =>state.session.user)
   const spot = useSelector(state => state?.spotReducer[id])
   const reviews = Object.values(useSelector(state => state.reviewReducer))
   console.log('spot', spot)
   console.log('review', reviews)
   const history = useHistory()
   const dispatch = useDispatch()


   useEffect( async () => {
     await dispatch(getSpot(id))
   },[dispatch])


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