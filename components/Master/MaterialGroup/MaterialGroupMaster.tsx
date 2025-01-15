import TabSection from '@/components/TabSection'
import useMaterialGroupHook from '@/hooks/master/MaterialGroup/material-group-hook'
import { useRouter } from 'next/router'
import MasterTableListing from '../Common/MasterTableListing'
import UpdateMasterModal from '../Common/UpdateMasterModal'
import MasterListing from '../MasterListing'
import AddMaterialGroupForm from './AddMaterialGroupForm'

const MaterialGroupMaster = () => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');
    const key = pathcontent[pathcontent?.length - 1];

    const { materialGroupData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord }: any = useMaterialGroupHook();
    return (
        <div className="container-lg">
            <MasterListing value={key} />
            <div className="d-flex justify-content-center">
                <TabSection firstTabHeading={"Material Group List"} secondTabHeading={"Create New Material Group"} />
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
                    <MasterTableListing tableData={materialGroupData} handleDeleteBtn={handleDeleteBtn} inputValue={inputValue} seInputValue={setInputValue} handleUpdateBtn={handleUpdateBtn} />
                </div>

                <div
                    className="tab-pane fade w-75"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <AddMaterialGroupForm handleInputChange={handleInputChange} inputValue={inputValue} seInputValue={setInputValue} handleSaveBtn={handleSaveBtn} />
                </div>
            </div>

            <UpdateMasterModal inputValue={inputValue} showModal={showModal} setShowModal={setShowModal} setInputValue={setInputValue} handleInputChange={handleInputChange} handleSaveBtn={handleUpdateRecord} />
        </div>
    )
}

export default MaterialGroupMaster