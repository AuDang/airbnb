import React, {useState} from 'react'
import { Modal } from '../../../context/Modal'
import DeleteReview from './DeleteReview'

const DeleteReviewModal = ({id}) => {
   const [showModal, setShowModal] =useState(false)

   return (
      <div className='delete-review-modal-container'>
         <div className='delete-review-modal-button-container' onClick={() => setShowModal(true)}>
            <p>Delete</p>
         </div>
         {showModal && 
         (<Modal onClose={() => setShowModal(false)}>
            <DeleteReview id={id} setShowModal={setShowModal}/>
         </Modal>)}
      </div>
   )
}

export default DeleteReviewModal