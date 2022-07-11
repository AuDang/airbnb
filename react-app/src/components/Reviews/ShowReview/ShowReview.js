import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getReviews } from "../../../store/review";

const ShowReview = () => {
   const dispatch =useDispatch()
   const sessionUser = useSelector(state => state.session.user)
   const reviews = useSelector(state => state.reviewsReducer)
   console.log('reviews', reviews )



useEffect(async() => {
   await dispatch(getReviews())
},[dispatch])

   return (
      <div>
         hello
      </div>
   )
}

export default ShowReview