
import React from 'react';
import { NavLink,} from 'react-router-dom';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import {GiCutDiamond} from 'react-icons/gi'
import airbnb from '../../images/Airbnb.png'


const NavBar = () => {
  const sessionUser = useSelector(state =>state.session.user)
  let sessionLinks
  

  return (
    <div className='navbar-container'>
      <div className='nav-icon-name'>
        <div className='nav-image-container'>
          <img className='nav-image'src={airbnb} alt='airbnb'></img>
        </div>  
        <div className='navbar-app-name'>
          <NavLink className='app-name-link'exact to={`/`}>
            <p className='app-name'>luxbnb</p>
          </NavLink>
        </div>
      </div>
      <div className='navbar-right'>
          <div className='host-spot-button'>
            <NavLink exact to='/spots/new'>
              {sessionUser && <button className='nav-host-button'type='submit'> Become a Host</button>}
            </NavLink>
          </div>
          <div className='nav-profile'>
            <ProfileButton />
          </div>
      </div>
    </div>
  );
}

export default NavBar;
