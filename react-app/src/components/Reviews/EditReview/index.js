import React, {useState} from 'react'
import {Modal} from '../../../context/Modal'
import EditReview from './EditReview'


const EditReviewModal = ({review}) => {
   const [showModal, setShowModal] = useState(false)

   return (
      <div className='edit-review-modal-container'>
         <div className='edit-rewiew-button-container' onClick={() => setShowModal(true)}>
            <p>Edit</p>
         </div>
         {showModal && 
         (<Modal onClose = {() => setShowModal(false)}>
            <EditReview current_review={review} setShowModal={setShowModal}/>
         </Modal>)}
      </div>
   )
}

export default EditReviewModal