import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import NoRecord from '@/components/General/NoRecord';
import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from '../../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../../CustomerSale/CustomerSalesTable1';
import SaleReturnsButtonSection from './ButtonSectionSalesReturn';
import UseSalesReturnDetailHook from '@/hooks/Sales/Sales-Returns/sales-return-detail-hook';
import Loader from '@/components/General/Loader';
import { get_detail_sales_return_data } from '@/store/slices/Sales/get-detail-sales-return-slice';

const DetailsPageSalesReturn = () => {
  const {
    readOnlyFields,
    isLoading,
    salesReturnTableData,
    setSalesReturnTableData,
    defaultSalesDate,
    selectedClient,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    handleUpdateDocStatus,
    handleUpdateSalesReturn,
    stateForDocStatus,
    setStateForDocStatus,
    itemList,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    handlePrintApi,
    handleDeleteSalesReturn,
    handleAmendButtonForSalesReturn,
    setItemCodeDropdownReset,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    deliveryNoteData,
    setDeliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailFunction,
  }: any = UseSalesReturnDetailHook();

  const { query }: any = useRouter();
  const DetailOfSalesReturnFromStore: any = useSelector(
    get_detail_sales_return_data
  );
  return (
    <div className="container-lg px-0 ">
      <SalesHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {DetailOfSalesReturnFromStore?.data?.length === 0 &&
          isLoading === false ? (
            <NoRecord
              title="Sales Return"
              content="Sorry for disappointing you! We’re unable to find any relevant data"
              backButtonUrl={`/sales/${query?.saleId}`}
            />
          ) : (
            <>
              <SaleReturnsButtonSection
                stateForDocStatus={stateForDocStatus}
                setStateForDocStatus={setStateForDocStatus}
                handleUpdateDeliveryNote={handleUpdateSalesReturn}
                readOnlyFields={readOnlyFields}
                setReadOnlyFields={setReadOnlyFields}
                showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
                setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
                HandleUpdateSalesdocStatus={handleUpdateDocStatus}
                HandleAmendButtonForSalesReturn={
                  handleAmendButtonForSalesReturn
                }
                HandleDeleteDeliveryNote={handleDeleteSalesReturn}
                handlePrintApi={handlePrintApi}
                showDeleteModal={showDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
                handleShowDeleteModal={handleShowDeleteModal}
                deleteRecord={deleteRecord}
              />

              <div>
                <CustomerSalesTable1
                  title={'Sales Return No	'}
                  clientNameListData={clientNameListData}
                  selectedClient={selectedClient}
                  setSelectedClient={setSelectedClient}
                  handleSelectClientGroup={handleSelectClientGroup}
                  clientGroupList={
                    clientNameListData?.length > 0 &&
                    clientNameListData !== null &&
                    clientNameListData.map((clientData: any) => ({
                      ...clientData,
                      client_group: clientData.client_group,
                    }))
                  }
                  readOnlyFields={readOnlyFields}
                  defaultSalesDate={defaultSalesDate}
                  setStateForDocStatus={setStateForDocStatus}
                  warehouseListData={warehouseListData}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  setDeliveryNoteData={setDeliveryNoteData}
                  deliveryNoteData={deliveryNoteData}
                  itemCodeDropdownReset={itemCodeDropdownReset}
                  setItemCodeDropdownReset={setItemCodeDropdownReset}
                />

                <CustomerSalesTable
                  handleSalesTableFieldChange={
                    handleSalesReturnTableFieldChange
                  }
                  salesTableData={salesReturnTableData}
                  setSalesTableData={setSalesReturnTableData}
                  selectedItemCodeForCustomerSale={
                    selectedItemCodeForCustomerSale
                  }
                  setSelectedItemCodeForCustomerSale={
                    setSelectedItemCodeForCustomerSale
                  }
                  handleAddRowForSales={handleAddRowForSalesReturn}
                  handleDeleteRowOfSalesTable={
                    handleDeleteRowOfSalesReturnTable
                  }
                  itemList={itemList}
                  itemCodeDropdownReset={itemCodeDropdownReset}
                  readOnlyFields={readOnlyFields}
                  setItemCodeDropdownReset={setItemCodeDropdownReset}
                  handleTabPressInSales={handleTabPressInSales}
                  kunCsOtFixedAmt={kunCsOtFixedAmt}
                  setKunCsOtFixedAmt={setKunCsOtFixedAmt}
                  HandleFixedAmt={HandleFixedAmt}
                  HandleEnterDetails={itemDetailFunction}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsPageSalesReturn;
