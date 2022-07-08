
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import LoginForm from '../auth/LoginFormModal/LoginForm';

const NavBar = () => {
  const sessionUser = useSelector(state =>state.session.user)
  let sessionLinks
  

  return (
    <div className='navbar-container'>
      <div className='navbar-app-name'>
        <p>
          luxbnb
        </p>
      </div>
        <ProfileButton />
    </div>
  );
}

export default NavBar;
