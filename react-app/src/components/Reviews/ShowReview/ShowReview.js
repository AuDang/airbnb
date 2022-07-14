import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getReviews } from "../../../store/review";
import { IoDiamond } from "react-icons/io5";
import EditReviewModal from "../EditReview";
import DeleteReviewModal from "../DeleteReview";
import './ShowReview.css'

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
               {/* {console.log('reviewMap' , review)} */}
               <div className='review-name-edit-delete-container'> 
                  <div className='each-review-username'>
                     Rated by: {review.username}
                     {/* {console.log("reviewid", review.id)} */}
                  </div>
                  <div className='review-edit-delete-container'>
                     <div className='review-edit'>
                        {sessionUser?.id === review?.user_id && <EditReviewModal review={review}/>}
                     </div>
                     <div classname='review-delete'>
                        {sessionUser?.id === review?.user_id && <DeleteReviewModal id={review?.id}/>}
                     </div>
                  </div>
               </div>
                  <div className='review-rating-container'>
                     <p> Rating: {[...Array(5)].map((diamond,i) => (
                        <IoDiamond key={i}
                        color={(i+1) <= review.rating ? "purple" : "lightgrey"}
                        />
                        ))}
                     </p>
                  </div>
               {/* </div>  */}
                     <p className='each-review'>{review.review}</p>
            </div>
         ))}
      </div>
   )
}

export default ShowReview