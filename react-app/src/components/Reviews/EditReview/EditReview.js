import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { editReview } from '../../../store/review'
import { IoDiamond } from "react-icons/io5";
import './EditReview.css'

const EditReview = ({current_review, setShowModal}) => {
   const dispatch=useDispatch()
   const sessionUser = useSelector(state=>state.session.user)
   const [rating, setRating] = useState(current_review.rating)
   const [review, setReview] =useState(current_review.review)
   const [errors, setErrors] = useState([])
   const [hover, setHover] =useState(null)
   console.log(current_review)


   const handleEdit =async (e) => {
      e.preventDefault()
      const edit_review ={
         id: current_review?.id,
         user_id: sessionUser?.id,
         spot_id: current_review?.spot_id,
         rating,
         review,
      }

      const data = await dispatch(editReview(edit_review))
      if(data.errors) {
         setErrors(data.errors)
      } else if (data) {
         setShowModal(false)
         
      }
   }

   useEffect(() => {
      const validation_errors = []
      if (review.length >=5000) {
         validation_errors.push("Maximum characters reached")
      }
      setErrors(validation_errors)
   }, [rating, review])
   return (
      <div className='review-form-container-page'>
         <div className='review-form-header'>
            <h1> Edit Your Review</h1>
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
               <div className='edit-review-form-rating-container'>
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
                  <button className='review-form-submit' onClick={handleEdit}>Submit</button>
               </div>
            </form>
      </div>
   )
}


export default EditReview