import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import AddMasterRecordForm from '../Master/Client/AddClientRecordForm'

const ClientDetailsModal = ({ showModal, setShowModal, clientDetails }: any) => {

    const [materialValue, setMaterialValue] = useState<any>([]);
    useEffect(() => {
        if (clientDetails?.material_data) {
            setMaterialValue(clientDetails?.material_data)
        }
    }, [clientDetails])

    const handleCloseModal: any = () => {
        setShowModal(false);
    }
    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} scrollable size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Client Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddMasterRecordForm materialValue={materialValue} isReadOnly={true} hideClientDetails={true} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ClientDetailsModal;