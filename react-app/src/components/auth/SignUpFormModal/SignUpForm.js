import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password -== repeatPassword) {
      const data = await dispatch(signUp(first, last, username, email, password, repeatPassword));
      if (data) {
        console.log('data', data)
        // setErrors(data)
        if (password !== repeatPassword) {
          data.push('Both passwords must match, please try again')
          // setPassword("")
          // setRepeatPassword("")
        }console.log('newdata', data)
        setErrors(data)
      }
    // }
  };
  const updateFirst = (e) => {
    setFirst(e.target.value)
  };
  const updateLast = (e) => {
    setLast(e.target.value)
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className = 'signup-form-container'>
      <form onSubmit={onSignUp}>
        <h1 className='signup-form-header'>Welcome to Luxbnb</h1>
        <div className='error-container'>
          {errors.length > 0 && (
            <div className='signup-form-error-container'>
              <span className="error-title">The following errors occured:</span>
              {errors.length && errors.map((error, ind) => (
                <li className='error-list' key={ind}>{error}</li>
              ))}
            </div>
          )}
        </div>
        <div className='signup-form-input-container'>

          <div className='signup-form'>
            <input className='signup-form-input'
            type='text'
            name='first'
            onChange={updateFirst}
            value={first}
            // required={true}
            placeholder='First name'
            />
          </div>
          <div className='signup-form'>
            <input className='signup-form-input'
            type='text'
            name='last'
            onChange={updateLast}
            value={last}
            // required={true}
            placeholder='Last name'
            />
          </div>
          <div className='signup-form'>
            {/* <label>User Name</label> */}
            <input className='signup-form-input'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='Username'
              ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Email</label> */}
            <input className='signup-form-input'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email Address'
              ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Password</label> */}
            <input className='signup-form-input'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
              ></input>
          </div>
          <div className='signup-form'>
            {/* <label>Repeat Password</label> */}
            <input className='signup-form-input'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='Confirm Password'
              ></input>
          </div>
          <div className='signup-button-container'>
            <button className='signup-button'type='submit'>Agree and continue</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;