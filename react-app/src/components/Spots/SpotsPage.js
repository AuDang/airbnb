import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spot';

const SpotsPage = () => {
   const spots = useSelector(state => state.spotReducer)
   console.log('spots', spots)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getAllSpots())
   },[dispatch])

   return (
      <div>
      hello
      </div>
   )
}

export default SpotsPage