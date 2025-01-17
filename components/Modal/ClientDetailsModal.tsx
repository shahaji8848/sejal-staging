import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import AddMasterRecordForm from '../Master/Client/AddClientRecordForm'

const ClientDetailsModal = ({ showModal, setShowModal, clientDetails }: any) => {

    const [materialValue, setMaterialValue] = useState<any>([]);
    const [inputValue, setInputValue] = useState<any>([]);
    useEffect(() => {
        if (clientDetails?.clientDetails) {

            setInputValue({
                client_name: clientDetails?.clientDetails?.client_name,
                client_group: clientDetails?.clientDetails?.client_group,
                sales_group: clientDetails?.clientDetails?.sales_group,
                kundan_category: clientDetails?.clientDetails?.kundan_category?.name,
                cs_category: clientDetails?.clientDetails?.cs_category?.name,
                bb_category: clientDetails?.clientDetails?.bb_category?.name,
                ot_category: clientDetails?.clientDetails?.ot_category?.name
            })
        }
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
                    <AddMasterRecordForm inputValue={inputValue} materialValue={materialValue} isReadOnly={true} hideClientDetails={true} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ClientDetailsModal;