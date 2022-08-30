import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spot';
import './SpotsPage.css'
import { NavLink } from 'react-router-dom';
import house1 from '../../static/house1.jpg'


const SpotsPage = () => {
   const spots = useSelector(state => state.spots)
   const spotsArr = Object.values(spots)
   // console.log('spots', spotsArr)
   // const reviews = Object.values(spotsArr)
   // console.log('spotsArr', reviews)

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getAllSpots())
   },[dispatch])



   return (
      <div className='spots-page-container'>
      {spotsArr.reverse().map(spot => (
         <div className='spotspage-container' key={spot.id}>
            <div className='all-spots-image'> 
               <NavLink exact to={`/spots/${spot.id}`}>
                  {spot?.images.length < 1? <img className='single-spot-image'src={house1}/>:<img className='single-spot-image' alt={`spots #${spot.id}`} src={spot?.images[0]?.image} />}
               </NavLink>
            </div>
            <div className='all-spots-info'>
               <div className='spotspage-location'>
                  <p>{spot?.city}, {spot?.state}</p>
               </div>
               <div className='spotspage-name'>
                  <p>{spot?.name}</p>
               </div>
               <div className='spotspage-price'>
                  <p>${spot?.price}/Night</p>
               </div>
            </div>
            <div>
               
            </div>
         </div>
         
      ))}
      </div>
   )
}

export default SpotsPage