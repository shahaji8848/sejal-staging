import React, { lazy, Suspense, useState } from 'react';
import SalesHeader from '@/components/Header/SalesHeader';
import TabSection from '@/components/TabSection';
import useCustomerSaleHook from '@/hooks/Sales/Customer-Sales/customer-sales-hook';
import useScrollbarHook from '@/hooks/Report/report-table-scrollbar-hook';
import { useSelector } from 'react-redux';
import { buttonLoadingState } from '@/store/slices/btn-loading-slice';

// Dynamic imports for components
const ReadyReceiptListing = lazy(() => import('@/components/ReadyReceipts/ReadyReceiptsListing'));
const ClientDetailsModal = lazy(() => import('@/components/Modal/ClientDetailsModal'));
const CustomerSalesTable = lazy(() => import('./CustomerSalesTable'));
const CustomerSaleTable1 = lazy(() => import('./CustomerSalesTable1'));
const CustomerSalesTable2 = lazy(() => import('./CustomerSalesTable2'));

const CustomerSaleMaster = () => {
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
    handleEmptyDeliveryNote,
    handleDNCreate,
    handleSelectClientGroup,
    clientGroupList,
    handleDeleteDeliveryNote,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    deliveryNoteListParams,
    deliveryNoteListing,
    selectedItemCode,
    setSelectedItemCode,
    handleUpdateDocStatus,
    handleTabPressInSales,
    warehouseListData,
    setDeliveryNoteData,
    deliveryNoteData,
    kunCsOtFixedAmt,
    handleFixedAmt,
    barcodedata,
    setBarcodeData,
    handleBarcodeData,
    barcodeListData,
    isBarcodeChecked,
    handleTabPressItemDetails,
    itemCodeList,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailApiFun,
    clientDetails,
    handleTable1InputChange,
    inputTable1Value
  }: any = useCustomerSaleHook();

  const {
    scrollableTableRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  }: any = useScrollbarHook();

  const buttonLoadingStateFromStore: any = useSelector(buttonLoadingState);

  const kundanListing =
    deliveryNoteListing && deliveryNoteListing.length > 0
      ? deliveryNoteListing.filter((data: any) => {
        return data.is_return === 0;
      })
      : [];

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClientDetailsBtn = () => {
    setShowModal(true);
  };

  console.log({ inputTable1Value })
  console.log({ salesTableData })

  return (
    <>
      <div className="container-lg px-0">
        <SalesHeader />
        <div className="d-flex justify-content-center">
          <TabSection
            firstTabHeading="Sales List"
            secondTabHeading="Create New Sales "
          />
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active tab-width"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="tab-responsive">
              <Suspense fallback={<div>Loading...</div>}>
                <ReadyReceiptListing
                  kundanListing={kundanListing}
                  karigarData={
                    clientNameListData?.length > 0 &&
                    clientNameListData !== null &&
                    clientNameListData.map((data: any) => ({
                      karigar_name: data.client_name,
                    }))
                  }
                  colPlaceholder1={'Sales No.'}
                  colPlaceholder2={'Client '}
                  HandleDeleteReceipt={handleDeleteDeliveryNote}
                  HandleUpdateDocStatus={handleUpdateDocStatus}
                  printApiMethod={'print_delivery_note_sales'}
                  printApiEntity={'sales'}
                  deleteApiVersion={'v1'}
                  deleteApiMethod={'delete_delivery_note_api'}
                  deleteApiEntity={'sales'}
                  purchasRecieptListParams={deliveryNoteListParams}
                  kunKarigarDropdownReset={itemCodeDropdownReset}
                  setKunKarigarDropdownReset={setItemCodeDropdownReset}
                  heading={'Delivery Note'}
                  showDeleteModal={showDeleteModal}
                  handleCloseDeleteModal={handleCloseDeleteModal}
                  handleShowDeleteModal={handleShowDeleteModal}
                  deleteRecord={deleteRecord}
                />
              </Suspense>
            </div>
          </div>
          <div
            className="tab-pane fade w-auto"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div className={`text-end mb-1`}>
                {inputTable1Value?.custom_client_name && (
                  <button
                    type="submit"
                    onClick={handleClientDetailsBtn}
                    className="btn btn-outline-primary px-2 py-0 form-submit-button"
                  >
                    Client Details
                  </button>
                )}
                <button
                  type="submit"
                  onClick={handleEmptyDeliveryNote}
                  className="btn btn-outline-primary px-2 py-0 ms-3 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={handleDNCreate}
                  disabled={buttonLoadingStateFromStore?.loading}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  {buttonLoadingStateFromStore?.loading === true && (
                    <i className="fa fa-spinner me-1"></i>
                  )}
                  Create
                </button>
              </div>

              <Suspense fallback={<div>Loading ...</div>}>
                <CustomerSaleTable1
                  clientNameListData={clientNameListData}
                  handleSelectClientGroup={handleSelectClientGroup}
                  clientGroupList={clientGroupList}
                  title="Sales No"
                  warehouseListData={warehouseListData}
                  setDeliveryNoteData={setDeliveryNoteData}
                  deliveryNoteData={deliveryNoteData}
                  itemCodeDropdownReset={itemCodeDropdownReset}
                  setItemCodeDropdownReset={setItemCodeDropdownReset}
                  barcodedata={barcodedata}
                  setBarcodeData={setBarcodeData}
                  handleBarcodeData={handleBarcodeData}
                  isBarcodeChecked={isBarcodeChecked}
                  handleTable1InputChange={handleTable1InputChange}
                  inputTable1Value={inputTable1Value}
                />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <CustomerSalesTable2
                  kunCategoryListData={kunCategoryListData}
                  csCategoryListData={csCategoryListData}
                  otCategoryListData={otCategoryListData}
                  BBCategoryListData={BBCategoryListData}
                  selectedCategory={selectedCategory}
                  setSeletedCategory={setSeletedCategory}
                  handleSelectChange={handleSelectChange}
                />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <CustomerSalesTable
                  handleSalesTableFieldChange={handleSalesTableFieldChange}
                  clientNameListData={clientNameListData}
                  salesTableData={salesTableData}
                  setSalesTableData={setSalesTableData}
                  selectedItemCodeForCustomerSale={selectedItemCodeForCustomerSale}
                  setSelectedItemCodeForCustomerSale={
                    setSelectedItemCodeForCustomerSale
                  }
                  handleAddRowForSales={handleAddRowForSales}
                  handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
                  selectedCategory={selectedCategory}
                  itemList={itemList}
                  itemCodeDropdownReset={itemCodeDropdownReset}
                  setItemCodeDropdownReset={setItemCodeDropdownReset}
                  selectedItemCode={selectedItemCode}
                  setSelectedItemCode={setSelectedItemCode}
                  handleTabPressInSales={handleTabPressInSales}
                  kunCsOtFixedAmt={kunCsOtFixedAmt}
                  handleFixedAmt={handleFixedAmt}
                  showAddrowBtn={true}
                  scrollableTableRef={scrollableTableRef}
                  handleMouseDown={handleMouseDown}
                  handleMouseUp={handleMouseUp}
                  handleMouseLeave={handleMouseLeave}
                  handleMouseMove={handleMouseMove}
                  showAdditionalInputForCalculation={true}
                  barcodeListData={barcodeListData}
                  barcodedata={barcodedata}
                  handleTabPressItemDetails={handleTabPressItemDetails}
                  itemCodeList={itemCodeList}
                  HandleEnterDetails={itemDetailApiFun}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientDetailsModal
            showModal={showModal}
            setShowModal={setShowModal}
            clientDetails={clientDetails}
          />
        </Suspense>
      </div>
    </>
  );
};

export default CustomerSaleMaster;
