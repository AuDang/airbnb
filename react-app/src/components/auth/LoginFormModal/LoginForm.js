import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={onLogin}>
        <h1 className='login-form-header'>Welcome to Luxbnb</h1>
          <div className='error-container'>
          {errors.length > 0 && (
            <div className='login-form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {errors.length && errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
            </div>
          )}
        </div>
        <div className='login-form-inputs'>
          <div className='login-form-email'>
            {/* <label htmlFor='email'>Email</label> */}
            <input className='login-form-email-field'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-form-password'>
            {/* <label htmlFor='password'>Password</label> */}
            <input className='login-form-password-field'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>

        </div>
        <div className='login-form-button'>
          <button  className='login-button' type='submit'>Continue</button>
        </div>
      </form>    
    </div>
  );
};

export default LoginForm;
