import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getSpot } from '../../store/spot';
import './SpotDetails.css'

const SpotDetails = () => {
   const {id} = useParams()
   const sessionUser = useSelector(state =>state.session.user)
   console.log('user',sessionUser)
   const spot = useSelector(state => state?.spotReducer[id])
   console.log('spot', spot)
   const history = useHistory()
   const dispatch = useDispatch()

   useEffect( async () => {
     await dispatch(getSpot(id))
   },[dispatch])


   return (
      <div className='spot-details-container'>
         <div className='spot-detail-name'>
            <h1>{spot?.name}</h1>
         </div>
         <div className='spot-detail-location'>
            {spot?.address}, {spot?.city},{spot?.state}
         </div>
         <div className='spot-detail-images'>
            {spot?.images.map(({ image }, idx) => (
               <img className='spot-detail-image' src={image} key={idx} alt="house" />
            ))}
         </div>
         <div className='spot-detail-host'>
         </div>
      </div>
   )
}

export default SpotDetails 