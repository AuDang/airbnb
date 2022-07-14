import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../store/review";
import { useParams } from "react-router-dom";
import { IoDiamond } from "react-icons/io5";
import './CreateReview.css'

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
      user_id: sessionUser?.id,
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
   if(review.length >= 1500) {
      validation_errors.push("Maximum characters reached")
   }
   setErrors(validation_errors)
}, [rating,review])

   return (
      <div className='review-form-container-page'>
         <div className='review-form-header'>
            <h1> Leave a Review</h1>
         </div>
         <div className='error-container'>
            {errors.length > 0 && (
            <div className='signup-form-error-container'>
               <span className="error-title">The following errors occured:</span>
               {errors.length && errors.map((error, ind) => (
                  <li className='error-list' key={ind}>{error}</li>
               ))}
            </div>
            )}
         </div>
            <form className='review-form-container'>
               <div className='review-form-rating-container'>
                  {[...Array(5)].map((diamond, i) =>(
                     <label>
                        <input className='review-form-rating'
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
                  {/* <label>Review</label> */}
                  <textarea className='review-form-textarea'
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