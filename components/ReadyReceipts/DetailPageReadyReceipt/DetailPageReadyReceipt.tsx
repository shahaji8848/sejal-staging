import useReadyReceiptDetailHook from '@/hooks/ReadyReceiptHook/ReadyReceiptDetail/ready-receipt-detail-hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../../../styles/detailPage.module.css';
import Loader from '../../General/Loader';
import NoRecord from '../../General/NoRecord';
import ReadyReceiptMasterTable from '../ReadyReceiptTable/ReadyReceiptMasterTable';
import ReadyReceiptModal from '../ReadyReceiptTable/ReadyReceiptModal/ReadyReceiptModal';
import ReadyReceiptTable from '../ReadyReceiptTable/ReadyReceiptTable';
import ReadyReceiptsTabs from '../ReadyReceiptsTabs';
import ReadyReceiptBtnSection from './ReadyReceiptBtnSection';

const DetailPageReadyReceipt = () => {
  const { query } = useRouter();
  const {
    defaultKarigarData,
    readOnlyFields,
    setReadOnlyFields,
    isLoading,
    handlePrintApi,
    handleRecipietChange,
    handleAddRow,
    karigarData,
    setRecipitData,
    handleFieldChange,
    tableData,
    handleDeleteRow,
    handleTabPress,
    setTableData,
    kundanKarigarData,
    handleModal,
    handleModalFieldChange,
    materialWeight,
    materialListData,
    calculateRowValue,
    handleDeleteChildTableRow,
    recipitData,
    setMaterialWeight,
    closeModal,
    handleSaveModal,
    showModal,
    lastPartOfURL,
    HandleDeleteReceipt,
    selectedDropdownValue,
    setSelectedDropdownValue,
    setReadyReceiptType,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateReceipt,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    handleAmendButtonForDuplicateChitti,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    calculateEditTotal,
    handleClearFileUploadInput,
    lastInputRef,
    firstInputRef,
    setMatWt,
    HandleUpdateDocStatus,
    handleTabPressOnModal,
    setKunKarigarDropdownReset,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    tabDisabled,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    specificDataFromStore,
  } = useReadyReceiptDetailHook();

  useEffect(() => {
    if (defaultKarigarData?.length > 0 && defaultKarigarData !== null) {
      defaultKarigarData.map((data: any) => {
        setTableData(data?.items);
        setRecipitData(data);
        setReadyReceiptType(data?.custom_ready_receipt_type);
        setSelectedDropdownValue(data?.custom_karigar);
        setSelectedLocation(data?.custom_store_location);
      });
    }
  }, [
    defaultKarigarData,
    setReadyReceiptType,
    setSelectedDropdownValue,
    setRecipitData,
    setTableData,
    setSelectedLocation,
  ]);


  return (
    <div className="container" style={{ position: 'relative' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {specificDataFromStore?.data?.length === 0 && isLoading === false ? (
            <NoRecord
              title="Ready Receipt"
              content="Sorry for disappointing you! We’re unable to find any relevant data"
              backButtonUrl={`/readyReceipt/${query?.receipt}`}
            />
          ) : (
            <>
              {tabDisabled ? (
                <Loader />
              ) : (
                <div>
                  {defaultKarigarData?.length > 0 &&
                    defaultKarigarData !== null &&
                    defaultKarigarData.map((data: any, index: any) => (
                      <div key={index}>
                        <ReadyReceiptsTabs />
                        <ReadyReceiptBtnSection
                          data={data}
                          stateForDocStatus={stateForDocStatus}
                          setStateForDocStatus={setStateForDocStatus}
                          handleUpdateReceipt={handleUpdateReceipt}
                          readOnlyFields={readOnlyFields}
                          setReadOnlyFields={setReadOnlyFields}
                          setShowSaveButtonForAmendFlow={
                            setShowSaveButtonForAmendFlow
                          }
                          showSaveButtonForAmendFlow={
                            showSaveButtonForAmendFlow
                          }
                          handleAmendButtonForDuplicateChitti={
                            handleAmendButtonForDuplicateChitti
                          }
                          handlePrintApi={handlePrintApi}
                          printApiMethod={
                            lastPartOfURL === 'kundan'
                              ? 'print_purchase_receipt_kundan'
                              : 'print_purchase_receipt_mangalsutra'
                          }
                          printApiEntity={
                            lastPartOfURL === 'kundan'
                              ? 'purchase_receipt'
                              : 'purchase_receipt'
                          }
                          HandleUpdateDocStatus={HandleUpdateDocStatus}
                          HandleDeleteReceipt={HandleDeleteReceipt}
                          showDeleteModal={showDeleteModal}
                          handleCloseDeleteModal={handleCloseDeleteModal}
                          handleShowDeleteModal={handleShowDeleteModal}
                          deleteRecord={deleteRecord}
                        />
                      </div>
                    ))}

                  <div className="table">
                    <ReadyReceiptTable
                      handleRecipietChange={handleRecipietChange}
                      recieptData={recipitData}
                      karigarData={karigarData}
                      setRecipitData={setRecipitData}
                      selectedDropdownValue={selectedDropdownValue}
                      setSelectedDropdownValue={setSelectedDropdownValue}
                      defaultKarigarData={defaultKarigarData}
                      setReadyReceiptType={setReadyReceiptType}
                      setStateForDocStatus={setStateForDocStatus}
                      readOnlyFields={readOnlyFields}
                      setReadOnlyFields={setReadOnlyFields}
                      warehouseListData={warehouseListData}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      setKunKarigarDropdownReset={setKunKarigarDropdownReset}
                    />
                  </div>
                  <div className="container d-flex justify-content-end p-o">
                    <button
                      className="btn btn-link p-0"
                      onClick={() => {
                        if (!readOnlyFields) {
                          handleAddRow('tableRow');
                        }
                      }}
                    >
                      Add Row
                    </button>
                  </div>
                  <div className="table">
                    <ReadyReceiptMasterTable
                      handleFieldChange={handleFieldChange}
                      tableData={tableData}
                      selectedKundanKarigarDropdownValue={
                        selectedKundanKarigarDropdownValue
                      }
                      setSelectedKundanKarigarDropdownValue={
                        setSelectedKundanKarigarDropdownValue
                      }
                      handleDeleteRow={handleDeleteRow}
                      handleTabPress={handleTabPress}
                      setTableData={setTableData}
                      kundanKarigarData={kundanKarigarData}
                      handleModal={handleModal}
                      setStateForDocStatus={setStateForDocStatus}
                      readOnlyFields={readOnlyFields}
                      setReadOnlyFields={setReadOnlyFields}
                      calculateEditTotal={calculateEditTotal}
                      handleClearFileUploadInput={handleClearFileUploadInput}
                      handleUpdateReceipt={handleUpdateReceipt}
                      lastInputRef={lastInputRef}
                      firstInputRef={firstInputRef}
                      setMatWt={setMatWt}
                      setKunKarigarDropdownReset={setKunKarigarDropdownReset}
                      specificDataFromStore={specificDataFromStore}
                      handleAmendButtonForDuplicateChitti={
                        handleAmendButtonForDuplicateChitti
                      }
                      tabDisabled={tabDisabled}
                    />
                  </div>
                  <ReadyReceiptModal
                    tableData={tableData}
                    showModal={showModal}
                    closeModal={closeModal}
                    handleModalFieldChange={handleModalFieldChange}
                    handleAddRow={handleAddRow}
                    materialWeight={materialWeight}
                    setMaterialWeight={setMaterialWeight}
                    materialListData={materialListData}
                    calculateRowValue={calculateRowValue}
                    handleDeleteChildTableRow={handleDeleteChildTableRow}
                    setRecipitData={setRecipitData}
                    recipitData={recipitData}
                    selectedDropdownValue={selectedDropdownValue}
                    setSelectedDropdownValue={setSelectedDropdownValue}
                    handleSaveModal={handleSaveModal}
                    setStateForDocStatus={setStateForDocStatus}
                    readOnlyFields={readOnlyFields}
                    setReadOnlyFields={setReadOnlyFields}
                    handleTabPressOnModal={handleTabPressOnModal}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPageReadyReceipt;
