import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../store/review";
import { useParams } from "react-router-dom";
import { IoDiamond } from "react-icons/io5";

const CreateReview = ({setShowModal}) => {
   const {id} = useParams()
   const dispatch = useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const [rating, setRating] = useState(0)
   const [review, setReview] =useState("")
   const [errors, setErrors] = useState([])
   const [hover, setHover] =useState(null)

const handleSubmit = async (e) => {
   e.preventDefault()
   const new_review = {
      user_id: sessionUser.id,
      spot_id: id,
      rating,
      review
   }

   const data = await dispatch(addReview(new_review))
   if (data?.errors) {
      setErrors(data?.errors)
   } else if (data) {
      setShowModal(false)
   }
}
useEffect(() => {
   const validation_errors = []
   if(review.length >= 5000) {
      validation_errors.push("Maximum characters reached")
   }
   setErrors(validation_errors)
}, [rating,review])

   return (
      <div className='review-form-containe-page'>
         <div className='review-form-header'>
            <h1> Leave a Review</h1>
         </div>
         {errors && 
         (<div className="review-form-error-container">
            {errors?.map((error, ind) => (
               <p className='review-form-error-message' key={ind}>{error}</p>
            ))}
         </div>)}
            <form className='review-form-container'>
               <div>
                  {[...Array(5)].map((diamond, i) =>(
                     <label>
                        <input className='review-form-rating-container'
                        type='radio'
                        value={rating} 
                        onClick={() => setRating(i+1)}
                        />
                        <IoDiamond
                        className="review-form-rating-diamond"
                        color={(i+1) <= (hover || rating) ? "purple": "lightgray"}
                        onMouseEnter={() => setHover(i +1)}
                        onMouseLeave={() => setHover(null)}
                        />
                     </label>
                  ))}
               </div>
               <div className='review-form-review-container'>
                  <label>Review</label>
                  <textarea
                     name='description'
                     value={review}
                     placeholder='Leave a review'
                     onChange={(e) => setReview(e.target.value)}
                  />
               </div>
               <div className='review-form-submit-container'>
                  <button className='review-form-submit' onClick={handleSubmit}>Submit Review</button>
               </div>
            </form>
      </div>
   )
}

export default CreateReview