import useMaterialHook from '@/hooks/master/material-hook';
import React from 'react';
import MasterSingleRecord from '../MasterSingleListing/MasterSingleRecord';
import { useRouter } from 'next/router';
import MultipleRecordMaster from '../MasterMultipleListing/MasterMaterialMaster';

const MaterialIndexPage = () => {
  const {
    materialList,
    HandleNameChange,
    HandleSave,
    nameValue,
    setNameValue,
    error1,
    error2,
    error3,
    HandleMaterialGrpSubmit,
    HandleMaterialGrpValue,
    errorM,
    setErrorM,
    materialGroupList,
    inputValueM,
    setInputValueM,
    selectedMaterialGroup,
    setSelectedMaterialGroup,
    matDropdownReset,
    setMatDropDownReset,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    handleUpdateMaterial,
    handleUpdateMaterialGroup,
    handleDeleteMaterial,
    handleDeleteMaterialGroup
  }: any = useMaterialHook();
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];
  let materialGroup: any =
    materialGroupList?.length > 0 &&
    materialGroupList !== null &&
    materialGroupList.map((data: any) => ({
      karigar_name: data.material_group,
      delete: data.delete
    }));
  return (
    <div>
      {key === 'materialGroup' && (
        <MasterSingleRecord
          karigarData={materialGroup}
          inputValue={inputValueM}
          HandleInputValue={HandleMaterialGrpValue}
          HandleSubmit={HandleMaterialGrpSubmit}
          error={errorM}
          setError={setErrorM}
          value={key}
          placeholder={'Material Group'}
          tab1={'Material Group List'}
          tab2={'Create New Material Group'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          setInputValueM={setInputValueM}
          handleUpdate={handleUpdateMaterialGroup}
          handleDelete={handleDeleteMaterialGroup}
        />
      )}
      {key === 'material' && (
        <MultipleRecordMaster
          value={key}
          materialList={materialList}
          HandleNameChange={HandleNameChange}
          HandleSave={HandleSave}
          nameValue={nameValue}
          error1={error1}
          error2={error2}
          error3={error3}
          tab1={'Material List'}
          tab2={'Create New Material'}
          placeholder1={'Material'}
          placeholder2={'Material Abbr'}
          placeholder3={'Material Group'}
          clientGroup={materialGroup}
          setSearchClient={setSelectedMaterialGroup}
          searchClient={selectedMaterialGroup}
          selectDropDownReset={matDropdownReset}
          setSelectDropDownReset={setMatDropDownReset}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          setNameValue={setNameValue}
          handleUpdate={handleUpdateMaterial}
          handleDelete={handleDeleteMaterial}
        />
      )}
    </div>
  );
};

export default MaterialIndexPage;
