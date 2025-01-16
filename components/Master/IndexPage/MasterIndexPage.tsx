import useMasterHook from '@/hooks/master/master-hook';
import { useRouter } from 'next/router';
import ClientMaster from '../Client/ClientMaster';
import MultipleRecordMaster from '../MasterMultipleListing/MasterMaterialMaster';
import MasterSingleRecord from '../MasterSingleListing/MasterSingleRecord';
import SubCategoryCodeMaster from '../SubCategory/SubCategoryCodeMaster';
import ClientGroupMaster from '../ClientGroup/ClientGroupMaster';
import SalesGroupMaster from '../SalesGroup/SalesGroupMaster';
import CategoryMaster from '../Category/CategoryMaster';
import KarigarMaster from '../Karigar/KarigarMaster';
import KundanKarigarMaster from '../KundanKarigar/KundanKarigarMaster';
import FewWtMaster from '../FewWt/FewWtMaster';

const MasterIndexPage = () => {
  const {
    clientList,
    HandleClientNameChange,
    HandleClientSave,
    kunCategoryData,
    otCategoryData,
    csCategoryData,
    BBCategory,
    clientName,
    HandleKunCsOtChange,
    HandleKunCsOtSave,
    HandleBBChange,
    HandleBBSave,
    setSearchClient,
    searchClient,
    errorC1,
    errorC2,
    errorC3,
    errorC,
    setErrorC,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    inputValue1,
    setInputValue1,
    clientGroupList,
    selectDropDownReset,
    setSelectDropDownReset,
    category,
    handleSelectCategory,
    HandleCategorySubmit,
    HandleCategoryValue,
    subCategory,
    HandleSubCategoryChange,
    HandleSubCategorySave,
    setSearchCategory,
    searchCategory,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    handleUpdateCategory,
    handleUpdateSubCategory,
    handleUpdateClient,
    handleUpdateClientGroup,
    handleUpdateBBCategory,
    handleUpdateKunCategory,
    handleUpdateCsCategory,
    handleUpdateOtCategory,
    handleDeleteCategory,
    handleDeleteSubCategory,
    handleDeleteClient,
    handleDeleteClientGroup,
    handleDeleteBBCategory,
    handleUpdateSalesGroup,
    handleDeleteSalesGroup,
    handleKunCategorySave,
    handleCsCategorySave,
    handleOtCategorySave,
    handleDeleteKunCategory,
    handleDeleteCsCategory,
    handleDeleteOtCategory,
    handleSalesGroupValue,
    handleSalesGroupSubmit,
    salesGroupListData,
    salesGroup,
    setSalesGroup
  }: any = useMasterHook();

  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];

  return (
    <div>

      {key === 'karigar' && (
        <KarigarMaster />
      )}
      {key === 'kundan-karigar' && (
        <KundanKarigarMaster />
      )}
      {key === 'client-group' && (
        <ClientGroupMaster />
      )}
      {key === 'few' && (
        <FewWtMaster />
      )}
      {key === 'client' && (
        <>
          <ClientMaster />
        </>
      )}
      {key === 'sales-group' && (
        <SalesGroupMaster />
      )}

      {key === 'kun-category' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            kunCategoryData?.length > 0 &&
            kunCategoryData !== null &&
            kunCategoryData.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={handleKunCategorySave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateKunCategory}
          handleDelete={handleDeleteKunCategory}
        />
      )}
      {key === 'cs-category' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            csCategoryData?.length > 0 &&
            csCategoryData !== null &&
            csCategoryData.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={handleCsCategorySave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateCsCategory}
          handleDelete={handleDeleteCsCategory}
        />
      )}
      {key === 'ot-category' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            otCategoryData?.length > 0 &&
            otCategoryData !== null &&
            otCategoryData.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleKunCsOtChange}
          HandleSave={handleOtCategorySave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateOtCategory}
          handleDelete={handleDeleteOtCategory}
        />
      )}

      {key === 'BBCategory' && (
        <MultipleRecordMaster
          value={key}
          materialList={
            BBCategory?.length > 0 &&
            BBCategory !== null &&
            BBCategory.map((data: any) => ({
              material: data.name1,
              material_abbr: data.type,
              delete: data.delete,
            }))
          }
          HandleNameChange={HandleBBChange}
          HandleSave={HandleBBSave}
          nameValue={clientName}
          error1={errorC1}
          error2={errorC2}
          placeholder1={'Category'}
          placeholder2={'Type'}
          tab1={'Category'}
          tab2={'Create New BB Category'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          handleUpdate={handleUpdateBBCategory}
          handleDelete={handleDeleteBBCategory}
        />
      )}
      {key === 'category' && (
        <CategoryMaster />
      )}
      {key === 'sub-category' && (
        <SubCategoryCodeMaster />
      )}
    </div>
  );
};

export default MasterIndexPage;
