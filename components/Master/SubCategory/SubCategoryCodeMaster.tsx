import React from 'react'
import MasterListing from '../MasterListing'
import TabSection from '@/components/TabSection'
import MasterTableListing from '../Common/MasterTableListing'
import UpdateMasterModal from '../Common/UpdateMasterModal'
import { useRouter } from 'next/router'
import useSubCategoryCodeHook from '@/hooks/master/subCategory/sub-category-hook'
import AddSubCategoryForm from './AddSubCategoryForm'

const SubCategoryCodeMaster = () => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');
    const key = pathcontent[pathcontent?.length - 1];

    const { subCategoryCodeData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord,
        handleMaterialChange,
        materialValue
    }: any = useSubCategoryCodeHook();

    console.log({ inputValue })
    return (
        <div className="container-lg">
            <MasterListing value={key} />
            <div className="d-flex justify-content-center">
                <TabSection firstTabHeading={"Sub Category Name List"} secondTabHeading={"Create New Sub Category"} />
            </div>
            <div
                className="tab-content d-flex justify-content-center"
                id="pills-tabContent"
            >
                <div
                    className="tab-pane fade show active tab-width"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <MasterTableListing tableData={subCategoryCodeData} handleDeleteBtn={handleDeleteBtn} inputValue={inputValue} seInputValue={setInputValue} handleUpdateBtn={handleUpdateBtn} />
                </div>

                <div
                    className="tab-pane fade w-75"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <AddSubCategoryForm handleInputChange={handleInputChange} inputValue={inputValue} seInputValue={setInputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                </div>
            </div>

            <UpdateMasterModal inputValue={inputValue} showModal={showModal} setShowModal={setShowModal} setInputValue={setInputValue} handleInputChange={handleInputChange} handleSaveBtn={handleUpdateRecord} handleMaterialChange={handleMaterialChange} materialValue={materialValue} />
        </div>
    )
}

export default SubCategoryCodeMaster