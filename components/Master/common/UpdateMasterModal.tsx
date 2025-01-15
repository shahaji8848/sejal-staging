import React from 'react'
import { Modal } from 'react-bootstrap';
import AddMasterRecordForm from '../Client/AddClientRecordForm';
import { useRouter } from 'next/router';
import AddKarigarRecordForm from '../Karigar/AddKarigarRecordForm';
import AddKundanKarigarRecordForm from '../KundanKarigar/AddKundanKarigarForm';
import AddMaterialGroupForm from '../MaterialGroup/AddMaterialGroupForm';
import AddSubCategoryForm from '../SubCategory/AddSubCategoryForm';
import AddClientGroupRecordForm from '../ClientGroup/AddClientGroupRecordForm';
import AddSalesGroupForm from '../SalesGroup/AddSalesGroupForm';
import AddCategoryRecordForm from '../Category/AddCategoryRecordForm';

const UpdateMasterModal = ({ showModal, setShowModal, handleInputChange, inputValue, setInputValue, setMaterialInputValue, handleMaterialChange, materialValue, handleSaveBtn }: any) => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');

    const key = pathcontent[pathcontent?.length - 1];
    const handleCloseModal: any = () => {
        setShowModal(false)
        if (inputValue) {
            setInputValue({})
        }
        console.log({ materialValue })
        if (materialValue?.length > 0) {
            setMaterialInputValue([])
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} scrollable size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Update {key}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {key === "client" && (
                        <AddMasterRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "client-group" && (
                        <AddClientGroupRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "karigar" && (
                        <AddKarigarRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "kundan-karigar" && (
                        <AddKundanKarigarRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "material-group" && (
                        <AddMaterialGroupForm handleInputChange={handleInputChange} inputValue={inputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "sub-category" && (
                        <AddSubCategoryForm handleInputChange={handleInputChange} inputValue={inputValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "sales-group" && (
                        <AddSalesGroupForm handleInputChange={handleInputChange} inputValue={inputValue} handleSaveBtn={handleSaveBtn} />
                    )}
                    {key === "category" && (
                        <AddCategoryRecordForm handleInputChange={handleInputChange} inputValue={inputValue} handleSaveBtn={handleSaveBtn} />
                    )}
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdateMasterModal