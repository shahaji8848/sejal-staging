import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CustomerSalesTable from '../CustomerSalesTable';
import CustomerSalesTable2 from '../CustomerSalesTable2';
import CustomerSalesTable1 from '../CustomerSalesTable1';
import SalesHeader from '@/components/Header/SalesHeader';
import useCustomerSaleDetailHook from '@/hooks/Sales/Customer-Sales/sales-detail-page-hook';
import CustomerSalesButtonsSection from './CustomerSalesButtonsSection';
import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import NoRecord from '@/components/General/NoRecord';
import Loader from '@/components/General/Loader';

const DetailPageCustomerSale = () => {
  const { query } = useRouter();
  const {
    salesTableData,
    setSalesTableData,
    kunCategoryListData,
    csCategoryListData,
    otCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesTableFieldChange,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    itemList,
    selectedClient,
    setSelectedClient,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateDeliveryNote,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    handleAmendButtonForCustomerSales,
    handleDeleteRecords,
    handleDeliveryNotePrintApi,
    defaultSalesDate,
    isLoading,
    setItemCodeDropdownReset,
    handleUpdateDocStatus,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    deliveryNoteData,
    setDeliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    handleFixedAmt,
    barcodedata,
    handleBarcodeData,
    barcodeListData,
    isBarcodeChecked,
    itemCodeList,
    handleTabPressItemDetails,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailApiFun,
  }: any = useCustomerSaleDetailHook();

  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  return (
    <div className="container-lg">
      <SalesHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {DetailOfDeliveryNoteFromStore?.data?.length === 0 &&
            isLoading === false ? (
            <NoRecord
              title="Customer Sales"
              content="Sorry for disappointing you! We’re unable to find any relevant data"
              backButtonUrl={`/sales/${query?.saleId}`}
            />
          ) : (
            <div>
              <div className={`text-end mb-1`}>
                <CustomerSalesButtonsSection
                  title={'Sales No'}
                  stateForDocStatus={stateForDocStatus}
                  setStateForDocStatus={setStateForDocStatus}
                  handleUpdateDeliveryNote={handleUpdateDeliveryNote}
                  readOnlyFields={readOnlyFields}
                  setReadOnlyFields={setReadOnlyFields}
                  showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
                  setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
                  HandleUpdateSalesdocStatus={handleUpdateDocStatus}
                  HandleAmendButtonForCustomerSales={
                    handleAmendButtonForCustomerSales
                  }
                  HandleDeleteRecords={handleDeleteRecords}
                  handleDeliveryNotePrintApi={handleDeliveryNotePrintApi}
                  showDeleteModal={showDeleteModal}
                  handleCloseDeleteModal={handleCloseDeleteModal}
                  handleShowDeleteModal={handleShowDeleteModal}
                  deleteRecord={deleteRecord}
                />
              </div>
              <CustomerSalesTable1
                clientNameListData={clientNameListData}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                defaultSalesDate={defaultSalesDate}
                warehouseListData={warehouseListData}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                setDeliveryNoteData={setDeliveryNoteData}
                deliveryNoteData={deliveryNoteData}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
                handleBarcodeData={handleBarcodeData}
                isBarcodeChecked={isBarcodeChecked}
              />
              <CustomerSalesTable2
                kunCategoryListData={kunCategoryListData}
                csCategoryListData={csCategoryListData}
                otCategoryListData={otCategoryListData}
                BBCategoryListData={BBCategoryListData}
                selectedCategory={selectedCategory}
                setSeletedCategory={setSeletedCategory}
                handleSelectChange={handleSelectChange}
                readOnlyFields={readOnlyFields}
                keyValue={'edit'}
              />
              <CustomerSalesTable
                handleSalesTableFieldChange={handleSalesTableFieldChange}
                clientNameListData={clientNameListData}
                salesTableData={salesTableData}
                setSalesTableData={setSalesTableData}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                handleAddRowForSales={handleAddRowForSales}
                handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
                selectedCategory={selectedCategory}
                itemList={itemList}
                readOnlyFields={readOnlyFields}
                showAddrowBtn={true}
                setStateForDocStatus={setStateForDocStatus}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
                handleTabPressInSales={handleTabPressInSales}
                kunCsOtFixedAmt={kunCsOtFixedAmt}
                setKunCsOtFixedAmt={setKunCsOtFixedAmt}
                handleFixedAmt={handleFixedAmt}
                showAdditionalInputForCalculation={true}
                handleBarcodeData={handleBarcodeData}
                barcodeListData={barcodeListData}
                barcodedata={barcodedata}
                itemCodeList={itemCodeList}
                handleTabPressItemDetails={handleTabPressItemDetails}
                HandleEnterDetails={itemDetailApiFun}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPageCustomerSale;
