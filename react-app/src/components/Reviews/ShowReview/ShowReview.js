import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getReviews } from "../../../store/review";

const ShowReview = () => {
   const dispatch =useDispatch()
   const {id} =useParams()
   const sessionUser = useSelector(state => state.session.user)
   const reviews = useSelector(state => state.reviewReducer)
   const reviewsArr = Object.values(reviews)
   const filteredReviewsArr = reviewsArr.filter(({spot_id}) => spot_id === +id)
   console.log('reviews', reviewsArr )
   console.log('filter', filteredReviewsArr)



useEffect(async() => {
   await dispatch(getReviews())
},[dispatch])

   return (
      <div className='review-display-container'>
         {filteredReviewsArr.map((review) =>(
            <div className='each-review-display-container'>
               {console.log('reviewMap' , review)}
               <div className='each-revire-username'>
                  {review.username}
               <p>{review.review}</p>
               </div>
            </div>
         ))}
      </div>
   )
}

export default ShowReview