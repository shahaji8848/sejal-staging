import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import AddMasterRecordForm from '../Client/AddClientRecordForm';

const UpdateMasterModal = ({ showModal, setShowModal, handleInputChange, inputValue, handleMaterialChange, materialValue, handleSaveBtn }: any) => {
    const handleCloseModal: any = () => {
        setShowModal(false)
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} scrollable size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Update </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddMasterRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                </Modal.Body>



                {/* <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                    // onClick={handleUpdate}
                    >
                        Save
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default UpdateMasterModal