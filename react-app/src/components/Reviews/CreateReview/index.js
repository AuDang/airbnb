import React, { useState } from "react"
import { Modal } from "../../../context/Modal"
import CreateReview from "./CreateReview"

const CreateReviewModal = () => {
    const [showModal, setShowModal] = useState(false)



    return (
        <div className="create-review-modal-container">
            <button className="create-review-modal-button" onClick={() => setShowModal(true)}>
                Leave a Review!
            </button>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReview setShowModal={setShowModal} />
                </Modal>
            }
        </div>
    )
}

export default CreateReviewModal