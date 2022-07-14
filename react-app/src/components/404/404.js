import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import error from '../../images/error.gif'
import './ErrorPage.css'

const ErrorPage = () => {
   return (
      <div className='error-page-container'>
         <div className='error-page-header-container'>
            <div>
               <h1 className='error-page-header'>Oops!</h1>
            </div>
            <p className='error-text-1'>We can't seem to find the page</p>
               <span className='error-text-1'>you're looking for.</span>
            <p className='error-text-2'>Error code: 404</p>
            <p>Here are some helpful links instead:</p>
            <NavLink className='error-spot-link'to='/'>
               Spots
            </NavLink>
         </div>
         <div className='error-image-container'>
            <img className='error-image' alt='error-image' src={error}>
            </img>
         </div>
      </div>
   )
}

export default ErrorPage