
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
    <nav>
      <ul>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <ProfileButton />
        {/* <LoginFormModal />
        <SignUpFormModal /> */}
      </ul>
    </nav>
  );
}

export default NavBar;
