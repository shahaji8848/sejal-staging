import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import AddMasterRecordForm from '../Client/AddClientRecordForm';
import { useRouter } from 'next/router';
import AddKarigarRecordForm from '../Karigar/AddKarigarRecordForm';

const UpdateMasterModal = ({ showModal, setShowModal, handleInputChange, inputValue, setInputValue, setMaterialInputValue, handleMaterialChange, materialValue, handleSaveBtn }: any) => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');

    const key = pathcontent[pathcontent?.length - 1];
    const handleCloseModal: any = () => {
        setShowModal(false)
        if (setInputValue) {
            setInputValue({})
        }
        if (setMaterialInputValue) {
            setMaterialInputValue([])
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} scrollable size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Update </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {key === "client" && (
                        <AddMasterRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "karigar" && (
                        <AddKarigarRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleSaveBtn={handleSaveBtn} />
                    )}
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdateMasterModal