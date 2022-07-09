
import React from 'react';
import { NavLink,} from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const sessionUser = useSelector(state =>state.session.user)
  let sessionLinks
  

  return (
    <div className='navbar-container'>
      <div className='navbar-app-name'>
        <NavLink exact to={`/`}>
          luxbnb
        </NavLink>
      </div>
      <div className='nav-right'>
        <div className='host-spot-container'>
          <NavLink exact to='spots/new'>
            <button type='submit'> Host a Spot</button>
          </NavLink>
        </div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default NavBar;
