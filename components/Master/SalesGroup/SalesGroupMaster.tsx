import { useRouter } from 'next/router';
import React from 'react'
import MasterListing from '../MasterListing';
import TabSection from '@/components/TabSection';
import MasterTableListing from '../Common/MasterTableListing';
import useSalesGroupHook from '@/hooks/master/salesGroup/sales-group-hook';
import UpdateMasterModal from '../Common/UpdateMasterModal';
import AddSalesGroupForm from './AddSalesGroupForm';

const SalesGroupMaster = () => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');
    const key = pathcontent[pathcontent?.length - 1];

    const { salesGroupData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord }: any = useSalesGroupHook();
    return (
        <div className="container-lg">
            <MasterListing value={key} />
            <div className="d-flex justify-content-center">
                <TabSection firstTabHeading={"Sales Group List"} secondTabHeading={"Create New Sales Group"} />
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
                    <MasterTableListing tableData={salesGroupData} handleDeleteBtn={handleDeleteBtn} inputValue={inputValue} seInputValue={setInputValue} handleUpdateBtn={handleUpdateBtn} />
                </div>

                <div
                    className="tab-pane fade w-75"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <AddSalesGroupForm handleInputChange={handleInputChange} inputValue={inputValue} seInputValue={setInputValue} handleSaveBtn={handleSaveBtn} />
                </div>
            </div>

            <UpdateMasterModal inputValue={inputValue} showModal={showModal} setShowModal={setShowModal} setInputValue={setInputValue} handleInputChange={handleInputChange} handleSaveBtn={handleUpdateRecord} />
        </div>
    )
}

export default SalesGroupMaster