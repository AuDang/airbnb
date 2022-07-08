import React, {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import * as sessionActions from '../../store/session'
import './NavBar.css'
import { StaticRouter, useHistory } from 'react-router-dom';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpForm from '../auth/SignUpFormModal/SignUpForm';
import SignUpFormModal from '../auth/SignUpFormModal';

function ProfileButton() {
   const dispatch =useDispatch();
   const [showMenu, setShowMenu] =useState(false);
   const sessionUser = useSelector(state => state.session.user)
   const history = useHistory()

   const openMenu = (e) => {
      // if(showMenu) return;
      setShowMenu(!showMenu);
   };
   
      const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      history.push('/')
   };

   let dropdownMenu

   if (sessionUser) {
      dropdownMenu = (
         <div>
            <p> Hello {sessionUser.username}</p>
            <button onClick={logout}> Logout</button>
         </div>
      )
   } else if (!sessionUser) {
      dropdownMenu = (
         <div>
            <LoginFormModal />
            <SignUpFormModal />
         </div>
      )
   }


  return (
   <div className='profile-container'>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (dropdownMenu)}
    </div>
  )
}

export default ProfileButton 