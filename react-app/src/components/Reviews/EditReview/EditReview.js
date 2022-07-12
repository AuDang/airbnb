import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { editReview } from '../../../store/review'
import { IoDiamond } from "react-icons/io5";

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
      <div className='edit-review-form-container-page'>
         <div className='edit-review-form-header'>
            <h1> Edit Your Review</h1>
         </div>
         {errors && 
         (<div className="edit-review-form-error-container">
            {errors?.map((error, ind) => (
               <p className='edit-review-form-error-message' key={ind}>{error}</p>
            ))}
         </div>)}
            <form className='edit-review-form-container'>
               <div>
                  {[...Array(5)].map((diamond, i) =>(
                     <label>
                        <input className='edit-review-form-rating-container'
                        type='radio'
                        value={rating} 
                        onClick={() => setRating(i+1)}
                        />
                        <IoDiamond
                        className="edit-review-form-rating-diamond"
                        color={(i+1) <= (hover || rating) ? "purple": "lightgray"}
                        onMouseEnter={() => setHover(i +1)}
                        onMouseLeave={() => setHover(null)}
                        />
                     </label>
                  ))}
               </div>
               <div className='edit-review-form-review-container'>
                  <label>Review</label>
                  <textarea
                     name='description'
                     value={review}
                     placeholder='Leave a review'
                     onChange={(e) => setReview(e.target.value)}
                  />
               </div>
               <div className='edit-review-form-submit-container'>
                  <button className='edit-review-form-submit' onClick={handleEdit}>Edit</button>
               </div>
            </form>
      </div>
   )
}


export default EditReview