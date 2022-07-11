import React, {useState} from "react"
import { Modal } from "../../context/Modal"
import EditSpot from "./EditSpot"

const EditSpotModal = () => {
    const [showModal,setShowModal] = useState(false)

    return (
        <div className= "edit-modal-container">
            <div className="edit-modal-button-container" onClick={() => setShowModal(true)}>
                <p className="edit-modal-button">Edit</p>
            </div>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <EditSpot setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    )
}

export default EditSpotModal