import React, { useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import * as sessionActions from '../../store/session'
import './NavBar.css'
import {useHistory,NavLink } from 'react-router-dom';
import LoginFormModal from '../auth/LoginFormModal';

import SignUpFormModal from '../auth/SignUpFormModal';
import {CgProfile} from 'react-icons/cg'

function ProfileButton() {
   const dispatch =useDispatch();
   const [showMenu, setShowMenu] =useState(false);
   const sessionUser = useSelector(state => state.session.user)
   const history = useHistory()

   const openMenu = () => {
      // if(showMenu) return;
      setShowMenu(!showMenu);
   };
   // const openMenu = (e) => {
   //    if(showMenu) return;
   //    setShowMenu(true);
   // };
   
   // useEffect(() => {
   //    if (!showMenu) return 
      
   //    const closeMenu = () => {
   //       setShowMenu(false)
   //    }

   //    document.addEventListener('click',closeMenu)

   // },[showMenu])

   const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      setShowMenu(false)
      history.push('/')
   };

   let dropdownMenu

   if (sessionUser) {
      dropdownMenu = (
         <div className='profile-dropdown'>
            <div className='dropdown-content'>
               <p className='nav-user'> Hello {sessionUser.username}</p>
               <NavLink className='nav-book-logout' to= {`/users/${sessionUser.id}/bookings`} >My Bookings</NavLink>
               <button className='nav-book-logout' onClick={logout}> Logout</button>
            </div>
         </div>
      )
   } else if (!sessionUser) {
      dropdownMenu = (
         <div className='profile-dropdown'>
            <div className='dropdown-content'>
               <LoginFormModal setShowMenu={setShowMenu}/>
               <SignUpFormModal />
            </div>
         </div>
      )
   }

  return (
   <div className='profile-container' onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} >
      <button className='profile-button'>
         <CgProfile className='profile-button-icon'/>
        {/* <i className="fas fa-user-circle" /> */}
      </button>
      <div>
         {showMenu && 
            <div>
               {dropdownMenu}
            </div>}
            
      </div>
    </div>
  )
}

export default ProfileButton 