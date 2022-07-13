import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getReviews } from "../../../store/review";
import { IoDiamond } from "react-icons/io5";
import EditReviewModal from "../EditReview";
import DeleteReviewModal from "../DeleteReview";

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
               <div className='each-review-username'>
                  {review.username}
                  {console.log("reviewid", review.id)}
               <div className='review-rating-container'>
                  <p> Rating: {[...Array(5)].map((diamond,i) => (
                     <IoDiamond key={i}
                     color={(i+1) <= review.rating ? "purple" : "lightgrey"}
                     />
                     ))}
                  </p>
                     <p className='each-review'>{review.review}</p>
                     <EditReviewModal review={review}/>
                     <DeleteReviewModal id={review?.id}/>
               </div> 
               </div>
            </div>
         ))}
      </div>
   )
}

export default ShowReview