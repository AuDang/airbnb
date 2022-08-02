import React, {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import * as sessionActions from '../../store/session'
import './NavBar.css'
import { StaticRouter, useHistory } from 'react-router-dom';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpForm from '../auth/SignUpFormModal/SignUpForm';
import SignUpFormModal from '../auth/SignUpFormModal';
import {CgProfile} from 'react-icons/cg'

function ProfileButton() {
   const dispatch =useDispatch();
   const [showMenu, setShowMenu] =useState(false);
   const sessionUser = useSelector(state => state.session.user)
   const history = useHistory()

   const openMenu = (e) => {
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
            <p> Hello {sessionUser.username}</p>
            <button className='logout-button' onClick={logout}> Logout</button>
         </div>
      )
   } else if (!sessionUser) {
      dropdownMenu = (
         <div className='profile-dropdown'>
            <LoginFormModal />
            <SignUpFormModal />
         </div>
      )
   }

  return (
   <div className='profile-container'>
      <button className='profile-button'onClick={openMenu}>
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