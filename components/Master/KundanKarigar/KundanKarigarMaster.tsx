import TabSection from '@/components/TabSection'
import useKundanKarigarHook from '@/hooks/master/KundanKarigar/kundan-karigar-hook'
import { useRouter } from 'next/router'
import MasterTableListing from '../Common/MasterTableListing'
import UpdateMasterModal from '../Common/UpdateMasterModal'
import MasterListing from '../MasterListing'
import AddKundanKarigarRecordForm from './AddKundanKarigarForm'

const KundanKarigarMaster = () => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');
    const key = pathcontent[pathcontent?.length - 1];

    const { kundanKarigarData,
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
        materialValue,
        setMaterialInputValue
    }: any = useKundanKarigarHook();

    return (
        <div className="container-lg">
            <MasterListing value={key} />
            <div className="d-flex justify-content-center">
                <TabSection firstTabHeading={"Kundan Karigar Name List"} secondTabHeading={"Create New Kundan Karigar"} />
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
                    <MasterTableListing tableData={kundanKarigarData} handleDeleteBtn={handleDeleteBtn} inputValue={inputValue} seInputValue={setInputValue} handleUpdateBtn={handleUpdateBtn} />
                </div>

                <div
                    className="tab-pane fade w-75"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <AddKundanKarigarRecordForm handleInputChange={handleInputChange} inputValue={inputValue} seInputValue={setInputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                </div>
            </div>

            <UpdateMasterModal inputValue={inputValue} showModal={showModal} setShowModal={setShowModal} setInputValue={setInputValue} handleInputChange={handleInputChange} handleSaveBtn={handleUpdateRecord} handleMaterialChange={handleMaterialChange} materialValue={materialValue} setMaterialInputValue={setMaterialInputValue} />
        </div>
    )
}

export default KundanKarigarMaster