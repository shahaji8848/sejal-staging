import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AmendDeliveryNoteApi from '@/services/api/Sales/delivery-note-amend-api';
import UpdateSaleApi from '@/services/api/Sales/put-update-delivery-note-api';
import PrintApi from '@/services/api/general/print-api';
import {
  GetDetailOfSalesReturn,
  get_detail_sales_return_data,
} from '@/store/slices/Sales/get-detail-sales-return-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import useSalesReturnMasterHook from './sales-return-master-hook';
import {
  btnLoadingStart,
  btnLoadingStop,
} from '@/store/slices/btn-loading-slice';

const useSalesReturnDetailHook = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();

  const {
    itemList,
    clientNameListData,
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    selectedClient,
    setSelectedClient,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleSalesReturnTableFieldChange,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    handleSelectClientGroup,
    setItemCodeDropdownReset,
    handleUpdateDocStatus,
    saleReturnDeliveryNoteListing,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    setStateForDocStatus,
    warehouseListData,
    setSelectedLocation,
    selectedLocation,
    deliveryNoteData,
    setDeliveryNoteData,
    stateForDocStatus,
    filteredTableDataForUpdate,
    selectedClientGroup,
    setSaleReturnDeliveryNoteListing,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailFunction,
  }: any = useSalesReturnMasterHook();

  const loginAcessToken = useSelector(get_access_token);

  const DetailOfSalesReturnFromStore: any = useSelector(
    get_detail_sales_return_data
  );

  const [readOnlyFields, setReadOnlyFields] = useState<any>(false);
  const [defaultSalesDate, setDefaultSalesDate] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSaveButtonForAmendFlow, setShowSaveButtonForAmendFlow] =
    useState<boolean>(false);

  useEffect(() => {
    if (Object?.keys(query)?.length > 0) {
      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfSalesReturn(reqParams));
    }
  }, [query]);

  useEffect(() => {
    if (DetailOfSalesReturnFromStore?.docStatus > 0) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [DetailOfSalesReturnFromStore]);

  useEffect(() => {
    if (
      DetailOfSalesReturnFromStore?.data?.length === 0 &&
      DetailOfSalesReturnFromStore?.isLoading === 'pending'
    ) {
      setIsLoading(true);
    } else if (
      DetailOfSalesReturnFromStore?.hasOwnProperty('data') &&
      DetailOfSalesReturnFromStore?.isLoading === 'succeeded'
    ) {
      setIsLoading(false);
      setSalesReturnTableData(DetailOfSalesReturnFromStore?.data?.items);
      setSelectedClient(DetailOfSalesReturnFromStore?.data?.custom_client_name);
      setSelectedLocation(DetailOfSalesReturnFromStore?.data?.store_location);
      setDefaultSalesDate(DetailOfSalesReturnFromStore?.data?.posting_date);
    } else {
      setIsLoading(false);
    }
  }, [DetailOfSalesReturnFromStore]);

  const handleUpdateSalesReturn: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesReturnTableData);
    const updatedData =
      filteredData.length > 0 &&
      filteredData !== null &&
      filteredData.map((data: any) => {
        const { warehouse, ...updatedObject } = data;
        return {
          ...updatedObject,
          custom_kun_amt: Number(data.custom_kun_pc) * Number(data?.custom_kun),
          custom_cs_amt: Number(data?.custom_cs_wt) * Number(data?.custom_cs),
          custom_ot_amt: Number(data.custom_other_wt) * Number(data.custom_ot_),
          custom_amount: Number(
            Number(Number(data.custom_kun_pc) * Number(data?.custom_kun)) +
              Number(Number(data?.custom_cs_wt) * Number(data?.custom_cs)) +
              Number(Number(data.custom_other_wt) * Number(data.custom_ot_)) +
              Number(data?.custom_other)
          )?.toFixed(2),
        };
      });
    const values = {
      ...deliveryNoteData,
      version: 'v1',
      method: 'put_delivery_note_sales_return',
      entity: 'sales_return',
      name: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      store_location:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
      is_return: '1',
      items: updatedData,
    };
    dispatch(btnLoadingStart());
    let updateSalesReturnApi: any = await UpdateSaleApi(
      loginAcessToken?.token,
      values
    );

    if (updateSalesReturnApi?.data?.message?.status === 'success') {
      setStateForDocStatus(false);
      dispatch(btnLoadingStop());
      const reqParams: any = {
        token: loginAcessToken.token,
        name: query?.deliveryNoteId,
      };
      dispatch(GetDetailOfSalesReturn(reqParams));
    } else {
      dispatch(btnLoadingStop());
    }
  };

  const handlePrintApi: any = async (id: any) => {
    const reqParams = {
      token: loginAcessToken?.token,
      name: id,
      version: 'v1',
      method: 'print_delivery_note_sales',
      entity: 'sales',
    };
    dispatch(btnLoadingStart());
    let deliveryNotePrintApi: any = await PrintApi(reqParams);
    if (deliveryNotePrintApi?.data?.message?.status === 'success') {
      window.open(
        deliveryNotePrintApi?.data?.message?.data?.data[0]?.print_url
      );
      dispatch(btnLoadingStop());
    } else {
      dispatch(btnLoadingStop());
    }
  };

  const handleAmendButtonForSalesReturn: any = async () => {
    const updatedSalesTableData: any = salesReturnTableData.map(
      (tableData: any) => ({
        ...tableData,
        qty: 1,
      })
    );
    const values = {
      amended_from: query?.deliveryNoteId,
      custom_client_name: selectedClient,
      is_return: '1',
      items: updatedSalesTableData,
    };
    dispatch(btnLoadingStart());
    let amendDeliveryNoteApi: any = await AmendDeliveryNoteApi(
      loginAcessToken?.token,
      values
    );

    if (amendDeliveryNoteApi?.data?.hasOwnProperty('data')) {
      setStateForDocStatus(false);
      setShowSaveButtonForAmendFlow(false);
      dispatch(btnLoadingStop());
      const newURL = `/sales/${query?.saleId}/${amendDeliveryNoteApi?.data?.data?.name}`;
      const asPath = `/sales/${query?.saleId}/${amendDeliveryNoteApi?.data?.data?.name}`;

      // Update the URL with the required query parameter
      router.push(newURL, asPath);
    } else {
      dispatch(btnLoadingStop());
    }
  };

  return {
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
    saleReturnDeliveryNoteListing,
    handleAmendButtonForSalesReturn,
    setItemCodeDropdownReset,
    setSaleReturnDeliveryNoteListing,
    handleTabPressInSales,
    warehouseListData,
    deliveryNoteData,
    setDeliveryNoteData,
    selectedLocation,
    setSelectedLocation,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    HandleFixedAmt,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailFunction,
  };
};

export default useSalesReturnDetailHook;
