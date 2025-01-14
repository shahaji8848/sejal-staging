import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import { get_client_name_data } from '@/store/slices/Master/get-client-name-slice';
import { get_warehouse_list_data } from '@/store/slices/Master/get-warehouse-list-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import useCustomSalesReturnHook from './custom-sales-return-hook';
import {
  btnLoadingStart,
  btnLoadingStop,
} from '@/store/slices/btn-loading-slice';

const useSalesReturnMasterHook = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const {
    salesReturnTableData,
    setSalesReturnTableData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesReturnTableFieldChange,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleEmptySaleReturnData,
    selectedClient,
    setSelectedClient,
    selectedClientGroup,
    handleSelectClientGroup,
    SalesTableInitialState,
    stateForDocStatus,
    setStateForDocStatus,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    saleReturnDeliveryNoteListing,
    setSaleReturnDeliveryNoteListing,
    handleUpdateDocStatus,
    handleDeleteSalesReturn,
    handleTabPressInSales,
    selectedLocation,
    setSelectedLocation,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    handleFixedAmt,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    updateSalesTableData,
  }: any = useCustomSalesReturnHook();
  const clientNameListData = useSelector(get_client_name_data).data;
  const warehouseListData = useSelector(get_warehouse_list_data).data;
  const [deliveryNoteData, setDeliveryNoteData] = useState({
    store_location: '',
  });
  const [itemList, setItemList] = useState<any>([]);
  const [selectedItemCode, setSelectedItemCode] = useState<any>();

  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'sales_return',
  };

  useEffect(() => {
    const getDataFromapi: any = async () => {
      const itemListApi: any = await getItemListInSalesApi(
        loginAcessToken.token
      );
      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getDataFromapi();
  }, []);

  const itemDetailFunction = (item_code: string, id: number) => {
    if (
      itemList?.length > 0 !== null &&
      itemList?.length > 0 &&
      itemList?.some((obj: any) => obj.name === item_code?.toUpperCase())
    ) {
      const getItemCodeDetailsFun = async () => {
        const getItemDetailsmethod: any =
          'get_delivery_note_specific_return_item';
        const getItemDetailsEntity: any = 'sales_return';
        try {
          let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
            loginAcessToken?.token,
            item_code,
            getItemDetailsmethod,
            getItemDetailsEntity
          );
          if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
            updateSalesTableData(
              getItemCodeDetailsApi?.data?.message?.data,
              id
            );
          }
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      };

      getItemCodeDetailsFun();
    }
  };
  const filteredTableDataForUpdate = (tableData: any) => {
    const filteredTableData = tableData.filter((row: any) => {
      // Check if there are no values except "idx"
      const hasNoValues = Object.keys(row).every(
        (key) => key === 'idx' || key === 'table' || row[key] === ''
      );

      // Exclude objects where item_code has no values and custom_gross_wt is equal to 0
      const shouldExclude = row.item_code === '';

      return !hasNoValues && !shouldExclude;
    });
    return filteredTableData;
  };

  const handleSRCreate: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesReturnTableData);
    const updatedData =
      filteredData?.length > 0 &&
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
      custom_client_name: selectedClient,
      custom_client_group: selectedClientGroup,
      store_location:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
      is_return: '1',
      version: 'v1',
      method: 'create_delivery_note_sales_return',
      entity: 'sales_return',

      items: updatedData,
    };
    const clientVal = values?.custom_client_name;
    if (clientVal !== '') {
      dispatch(btnLoadingStart());
      const postSalesReturnApi: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      if (postSalesReturnApi?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Sucessfully');
        dispatch(btnLoadingStop());
        router.push(
          `${query.saleId}/${postSalesReturnApi?.data?.message?.name}`
        );
      } else if (postSalesReturnApi?.data?.message?.status === 'error') {
        dispatch(btnLoadingStop());
        toast.error(postSalesReturnApi?.data?.message?.message);
      }
    } else {
      dispatch(btnLoadingStop());
      toast.error('Client name is mandatory');
    }
  };

  return {
    itemList,
    clientNameListData,
    handleSRCreate,
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
    SalesTableInitialState,
    stateForDocStatus,
    filteredTableDataForUpdate,
    selectedClientGroup,
    setSaleReturnDeliveryNoteListing,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    handleFixedAmt,
    selectedItemCode,
    setSelectedItemCode,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailFunction,
  };
};

export default useSalesReturnMasterHook;
