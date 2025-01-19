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
    handleAddRow,
    karigarData,
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
    tabDisabled,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    specificDataFromStore,
    inputTable1Value,
    setInputTable1Value,
    handleTable1InputChange,
    showFewModal,
    fewWeight,
    setFewWeight
  } = useReadyReceiptDetailHook();

  console.log({ warehouseListData })
  useEffect(() => {
    if (defaultKarigarData?.length > 0 && defaultKarigarData !== null) {
      defaultKarigarData.map((data: any) => {

        let updatedWarehouseId: any = warehouseListData?.length > 0 && warehouseListData.filter((warehouse: any) => warehouse.name === data?.set_warehouse)

        setInputTable1Value({
          custom_karigar: data?.custom_karigar,
          custom_category: data?.custom_category,
          remarks: data?.remarks,
          custom_ready_receipt_type: data?.custom_ready_receipt_type,
          set_warehouse: updatedWarehouseId?.length > 0 && updatedWarehouseId[0]?.location, // Update the custom_warehouse
        });
        setTableData(data?.items);

        // setInputTable1Value(data)
      });
    }
  }, [
    defaultKarigarData,
    setTableData,
  ]);
  console.log({ specificDataFromStore })
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
                      karigarData={karigarData}
                      defaultKarigarData={defaultKarigarData}
                      setReadyReceiptType={setReadyReceiptType}
                      setStateForDocStatus={setStateForDocStatus}
                      readOnlyFields={readOnlyFields}
                      setReadOnlyFields={setReadOnlyFields}
                      warehouseListData={warehouseListData}
                      inputTable1Value={inputTable1Value}
                      handleTable1InputChange={handleTable1InputChange}
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
                    showFewModal={showFewModal}
                    fewWeight={fewWeight}
                    setFewWeight={setFewWeight}
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
