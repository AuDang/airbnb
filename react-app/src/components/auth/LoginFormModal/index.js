import React, {useState} from 'react';
import {Modal} from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className='nav-loginsignup-container'>
         <button className='nav-sign-button' onClick={() => setShowModal(true)}>Log in</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <LoginForm />
            </Modal>
         )}
      </div>
   )
}


export default LoginFormModal;