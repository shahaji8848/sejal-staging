import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth/login-slice';
import useCustomCustomerSalesHook from './custom-customer-sales-hook';
import useCustomerSalesListingHook from './customer-sales-listing-hook';
import { useDeleteModal } from '@/hooks/DeleteModal/delete-modal-hook';
import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';
import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import getItemDetailsInSalesApi from '@/services/api/Sales/get-item-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import PostSalesApi from '@/services/api/Sales/post-delivery-note-api';
import DeleteApi from '@/services/api/general/delete-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import { get_bb_category_data } from '@/store/slices/Master/get-bb-category-slice';
import { get_client_group_data } from '@/store/slices/Master/get-client-group-slice';
import { get_client_name_data } from '@/store/slices/Master/get-client-name-slice';
import { get_kun_category_data } from '@/store/slices/Master/get-kun-category-slice';
import { get_warehouse_list_data } from '@/store/slices/Master/get-warehouse-list-slice';
import { GetDetailOfDeliveryNote } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import {
  btnLoadingStart,
  btnLoadingStop,
} from '@/store/slices/btn-loading-slice';
import { get_cs_category_data } from '@/store/slices/Master/get-cs-category-slice';
import { get_ot_category_data } from '@/store/slices/Master/get-ot-category-slice';

const useCustomerSaleHook = () => {
  const { deliveryNoteListing, setDeliveryNoteListing }: any =
    useCustomerSalesListingHook();

  const {
    handleAddRowForSales,
    salesTableData,
    setSalesTableData,
    setStateForDocStatus,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    stateForDocStatus,
    handleEmptyDeliveryNote,
    selectedCategory,
    setSeletedCategory,
    setSelectedClient,
    setItemCodeDropdownReset,
    selectedClient,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    updateSalesTableData,
    updateBarcodeSalesTableData,
    handleDeleteRowOfSalesTable,
    handleFixedAmt,
    clientDetails,
    itemCodeDetails,
    setItemCodeDetails
  } = useCustomCustomerSalesHook();

  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useDeleteModal();

  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const loginAcessToken = useSelector(get_access_token);

  const kunCategoryListData = useSelector(get_kun_category_data).data;
  const csCategoryListData = useSelector(get_cs_category_data).data;
  const otCategoryListData = useSelector(get_ot_category_data).data;
  const BBCategoryListData = useSelector(get_bb_category_data).data;
  const warehouseListData = useSelector(get_warehouse_list_data).data;
  const clientNameListData = useSelector(get_client_name_data).data;
  const clientGroupList = useSelector(get_client_group_data).data;
  const [itemList, setItemList] = useState<any>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedItemCode, setSelectedItemCode] = useState<any>();

  const [deliveryNoteData, setDeliveryNoteData] = useState<any>({
    store_location: '',
  });
  const [barcodeListData, setBarcodeListData] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<string>('Mumbai');
  const [selectedClientGroup, setSelectedClientGroup] = useState<string>('');
  const [barcodedata, setBarcodeData] = useState<number>(0);
  const [isBarcodeChecked, setIsBarcodeChecked] = useState<boolean>(false);

  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      let itemListApi: any = await getItemListInSalesApi(loginAcessToken.token);
      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }
      const BarcodeData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      if (BarcodeData?.data?.message?.status === 'success') {
        setBarcodeListData(BarcodeData?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);
  useEffect(() => {
    setSelectedLocation('Mumbai');
  }, []);

  const handleSalesTableFieldChange = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesTableData((prevData: any[]) => {
      // Create a new array and update the specific item
      const updatedData = prevData.map((item) => {
        if (item.idx === itemIdx) {
          const updatedItem = {
            ...item,
            [fieldName]: Number(value), // Update the specific field
          };

          // Recalculate custom_net_wt and dependent fields
          updatedItem.custom_net_wt = Math.max(
            0,
            Number(updatedItem.custom_gross_wt || 0) -
            (Number(updatedItem.custom_kun_wt || 0) +
              Number(updatedItem.custom_cs_wt || 0) +
              Number(updatedItem.custom_bb_wt || 0) +
              Number(updatedItem.custom_other_wt || 0))
          );

          // Recalculate amounts
          if (fieldName === "custom_cs_wt") {
            updatedItem.custom_cs_amt = Number(updatedItem.custom_cs_wt) * value;
          }

          if (fieldName === "custom_kun_wt") {
            updatedItem.custom_kun_amt =
              Number(updatedItem.custom_kun_pc || 0) * Number(value);
          }

          if (fieldName === "custom_kun_pc") {
            updatedItem.custom_kun_amt =
              Number(updatedItem.custom_kun_wt || 0) * Number(value);
          }

          if (fieldName === "custom_other_wt") {
            updatedItem.custom_ot_amt =
              Number(updatedItem.custom_other_wt || 0) * Number(value);
          }

          updatedItem.custom_amount =
            Number(updatedItem.custom_cs_amt || 0) +
            Number(updatedItem.custom_kun_amt || 0) +
            Number(updatedItem.custom_ot_amt || 0);

          return updatedItem; // Return the updated item
        }
        return item; // Return the unchanged item
      });
      return updatedData; // Return the updated array
    });

    setStateForDocStatus(true); // Update the document status
  };

  useEffect(() => {
    setSalesTableData((prevData: any) => {
      return prevData.map((item: any) => ({
        ...item,
        custom_net_wt: Math.max(
          0,
          Number(item.custom_gross_wt || 0) -
          (Number(item.custom_kun_wt || 0) +
            Number(item.custom_cs_wt || 0) +
            Number(item.custom_bb_wt || 0) +
            Number(item.custom_other_wt || 0))
        ),
        custom_amount: Math.max(
          0,
          Number(item.custom_cs_amt || 0) +
          Number(item.custom_kun_amt || 0) +
          Number(item.custom_ot_amt || 0) +
          Number(item.custom_other || 0)
        ),
      }));
    });
  }, [
    salesTableData?.map((item: any) =>
      [
        item?.custom_gross_wt,
        item?.custom_kun_wt,
        item?.custom_cs_wt,
        item?.custom_bb_wt,
        item?.custom_other_wt,
        item?.custom_cs_amt,
        item?.custom_kun_amt,
        item?.custom_ot_amt,
        item?.custom_other,
      ].join(",")
    ).join(","),
  ]);

  const itemCodeListFunc = () => {
    if (barcodedata === 1) {
      const namesArray =
        barcodeListData?.length > 0 &&
        barcodeListData !== null &&
        barcodeListData.map((item: any) => ({ karigar_name: item.item_code }));
      return namesArray;
    } else {
      return (
        itemList?.length > 0 &&
        itemList !== null &&
        itemList.map((data: any) => ({
          karigar_name: data.name,
        }))
      );
    }
  };
  const itemCodeList = itemCodeListFunc();

  const itemDetailApiFun = (item_code: string, id: number) => {
    if (barcodedata === 1) {
      if (
        itemCodeList?.length > 0 !== null &&
        itemCodeList?.length > 0 &&
        itemCodeList?.some(
          (obj: any) => obj.karigar_name === item_code?.toUpperCase()
        )
      ) {
        const itemDetailsMethod = 'get_specific_barcode_detail';
        const itemDetailsEntity = 'barcode';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              setItemCodeDetails(getItemCodeDetailsApi?.data?.message?.data)
              updateBarcodeSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data[0],
                id,
                "addNewRow"
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    } else {
      if (
        // selectedItemCodeForCustomerSale.item_code?.length > 0
        itemCodeList !== null &&
        itemCodeList?.length > 0 &&
        itemCodeList?.some((obj: any) => obj.karigar_name === item_code)
      ) {
        const itemDetailsMethod = 'get_item_specific_sales';
        const itemDetailsEntity = 'sales';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              // Call the function to update salesTableData
              setItemCodeDetails(getItemCodeDetailsApi?.data?.message?.data)
              updateSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data[0],
                id,
                true
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };
        getItemCodeDetailsFun();
      }
    }
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;

    // Determine the selected array based on the category
    const selectedArray =
      name === "BbCategory"
        ? BBCategoryListData
        : name === "CsCategory"
          ? csCategoryListData
          : name === "OtCategory"
            ? otCategoryListData
            : kunCategoryListData;

    // Handle default option
    let selectedObj: any = null;
    if (value !== "default") {
      selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);
    }

    // Update selected category state
    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));

    // Update each row of the sales table
    setSalesTableData((prevSalesTableData: any) => {
      return prevSalesTableData.map((row: any) => {
        let clientData: any = clientDetails?.tableData;
        let updatedRow = { ...row };

        // Find the matching item in itemCodeDetails
        const itemDetails = itemCodeDetails?.find(
          (item: any) => item?.item_code === row.item_code
        );

        if (value === "default") {
          // Reset or update only the corresponding field based on the category
          switch (name) {
            case "BbCategory":
              updatedRow.custom_bb_wt = clientData
                ? clientData?.custom_bb_wt ?? row?.custom_bb_wt
                : itemDetails?.custom_bb_wt ?? row?.custom_bb_wt;
              break;
            case "CsCategory":
              updatedRow.custom_cs_wt = clientData
                ? clientData?.custom_cs_wt ?? row?.custom_cs_wt
                : itemDetails?.custom_cs_wt ?? row?.custom_cs_wt;
              break;
            case "KunCategory":
              updatedRow.custom_kun_wt = clientData
                ? clientData?.custom_kun_wt ?? row?.custom_kun_wt
                : itemDetails?.custom_kun_wt ?? row?.custom_kun_wt;
              break;
            case "OtCategory":
              updatedRow.custom_other_wt = clientData
                ? clientData?.custom_other_wt ?? row?.custom_other_wt
                : itemDetails?.custom_other_wt ?? row?.custom_other_wt;
              break;
            default:
              break;
          }
        }
        else if (selectedObj) {
          // Update values based on selected category and itemCodeDetails
          if (name === "KunCategory" && itemDetails) {
            updatedRow.custom_kun_wt = Number((itemDetails?.custom_kun_wt * selectedObj?.type) / 100);
          } else if (name === "CsCategory" && itemDetails) {
            updatedRow.custom_cs_wt = Number((itemDetails?.custom_cs_wt * selectedObj?.type) / 100);
          } else if (name === "BbCategory" && itemDetails) {
            updatedRow.custom_bb_wt = Number(itemDetails?.custom_bb_wt - selectedObj?.type);
          } else if (name === "OtCategory" && itemDetails) {
            updatedRow.custom_other_wt = Number((itemDetails?.custom_other_wt * selectedObj?.type) / 100);
          }
        }

        // Recalculate the custom_net_wt and any other dependent values
        updatedRow.custom_net_wt =
          Number(updatedRow.custom_gross_wt) -
          (Number(updatedRow.custom_kun_wt) +
            Number(updatedRow.custom_cs_wt) +
            Number(updatedRow.custom_bb_wt) +
            Number(updatedRow.custom_other_wt));

        updatedRow.custom_amount =
          Number(updatedRow.custom_cs_amt) +
          Number(updatedRow.custom_kun_amt) +
          Number(updatedRow.custom_ot_amt) +
          Number(updatedRow.custom_other);

        return updatedRow;
      });
    });

    setStateForDocStatus(true);
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

  const handleDNCreate: any = async () => {
    const filteredData = filteredTableDataForUpdate(salesTableData);

    const updatedData =
      filteredData.length > 0 &&
      filteredData !== null &&
      filteredData.map((data: any) => {
        const {
          custom_pr_bb_wt,
          custom_pr_cs_wt,
          custom_pr_kun_wt,
          custom_pr_other_wt,
          warehouse,
          ...updatedObject
        } = data;
        return {
          ...updatedObject,
          custom_net_wt:
            Number(data?.custom_gross_wt) -
            (Number(data?.custom_kun_wt) +
              Number(data?.custom_cs_wt) +
              Number(data?.custom_bb_wt) +
              Number(data?.custom_other_wt)),
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
      custom_is_barcode: barcodedata,
      version: 'v1',
      method: 'create_delivery_note',
      entity: 'sales',
      custom_kun_category: selectedCategory?.KunCategory?.name1,
      custom_cs_category: selectedCategory?.CsCategory?.name1,
      custom_bb_category: selectedCategory?.BbCategory?.name1,
      custom_ot_category: selectedCategory?.OtCategory?.name1,
      items: updatedData,
    };
    let reqField = values.custom_client_name;
    if (reqField === '') {
      toast.error('Client Name is Mandatory');
    } else {
      dispatch(btnLoadingStart());
      const postDeliveryNote: any = await PostSalesApi(
        loginAcessToken.token,
        values
      );

      if (postDeliveryNote?.data?.message?.status === 'success') {
        toast.success('Delivery note Created Successfully');
        dispatch(btnLoadingStop());
        router.push(`${query.saleId}/${postDeliveryNote?.data?.message?.name}`);
      }
      if (postDeliveryNote?.data?.message?.status === 'error') {
        dispatch(btnLoadingStop());
        toast.error(`${postDeliveryNote?.data?.message?.message}`);
      }
    }
  };
  const handleSelectClientGroup = async (value: any) => {
    setSelectedClientGroup(value);
  };

  const handleTabPressInSales = (event: any, id: any, keyValue: any) => {
    if (
      event.key === 'Tab' &&
      id === salesTableData[salesTableData.length - 1].idx
    ) {
      handleAddRowForSales();
    }
    setStateForDocStatus(true);
  };
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'sales_return',
  };
  const handleDeleteDeliveryNote: any = async (name: any) => {
    setShowDeleteModal(false);
    dispatch(btnLoadingStart());
    const version = 'v1';
    const method = 'delete_delivery_note_api';
    const entity = 'sales';

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      name
    );

    if (deleteApi?.data?.message?.status === 'success') {
      toast.success('Sales note Deleted');
      dispatch(btnLoadingStop());
      let updatedData: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (updatedData?.data?.message?.status === 'success') {
        setDeliveryNoteListing(updatedData?.data?.message?.data);
        if (query?.receiptId === name) {
          router.back();
        }
      }
    } else {
      dispatch(btnLoadingStop());
      toast.error('Failed to delete sales note');
    }
  };

  const handleUpdateDocStatus: any = async (docStatus?: any, name?: any) => {
    let id: any = name === undefined ? query?.deliveryNoteId : name;
    const params = `/api/resource/Delivery Note/${id}`;
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      params
    );
    dispatch(btnLoadingStart());
    if (updateDocStatus?.data?.hasOwnProperty('data')) {
      if (name === undefined) {
        const reqParams: any = {
          token: loginAcessToken.token,
          name: query?.deliveryNoteId,
        };
        dispatch(btnLoadingStop());
        dispatch(GetDetailOfDeliveryNote(reqParams));
      } else {
        let updatedData: any = await getDeliveryNoteListing(
          loginAcessToken.token,
          deliveryNoteListParams
        );

        if (updatedData?.data?.message?.status === 'success') {
          setDeliveryNoteListing(updatedData?.data?.message?.data);
        }
      }
    } else {
      dispatch(btnLoadingStop());
      toast.error('Failed to Update Sales note');
    }
  };

  const handleBarcodeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (barcodedata === 0) {
      setBarcodeData(1);
    } else setBarcodeData(0);
    setStateForDocStatus(true);
    setIsBarcodeChecked(!isBarcodeChecked);
  };

  const handleTabPressItemDetails = () => {
    if (barcodedata === 1) {
      if (selectedItemCodeForCustomerSale.item_code?.length > 4) {
        const itemDetailsMethod = 'get_specific_barcode_detail';
        const itemDetailsEntity = 'barcode';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );
            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              // Call the function to update salesTableData
              updateBarcodeSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data[0],
                selectedItemCodeForCustomerSale.id,
                "addNewRow"
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    } else {
      if (selectedItemCodeForCustomerSale.item_code?.length > 4) {
        const itemDetailsMethod = 'get_item_specific_sales';
        const itemDetailsEntity = 'sales';
        const getItemCodeDetailsFun = async () => {
          try {
            let getItemCodeDetailsApi = await getItemDetailsInSalesApi(
              loginAcessToken?.token,
              selectedItemCodeForCustomerSale.item_code,
              itemDetailsMethod,
              itemDetailsEntity
            );

            if (getItemCodeDetailsApi?.data?.message?.status === 'success') {
              updateSalesTableData(
                getItemCodeDetailsApi?.data?.message?.data[0],
                selectedItemCodeForCustomerSale?.id,
                true
              );
            }
          } catch (error) {
            console.error('Error fetching item details:', error);
          }
        };

        getItemCodeDetailsFun();
      }
    }
  };

  return {
    salesTableData,
    setSalesTableData,
    kunCategoryListData,
    csCategoryListData,
    otCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
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
    selectedClient,
    setSelectedClient,
    handleDNCreate,
    stateForDocStatus,
    setStateForDocStatus,
    clientGroupList,
    handleDeleteDeliveryNote,
    handleSelectClientGroup,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    deliveryNoteListParams,
    deliveryNoteListing,
    selectedItemCode,
    setSelectedItemCode,
    handleUpdateDocStatus,
    handleTabPressInSales,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    setDeliveryNoteData,
    deliveryNoteData,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    handleFixedAmt,
    barcodedata,
    setBarcodeData,
    handleBarcodeData,
    barcodeListData,
    isBarcodeChecked,
    setIsBarcodeChecked,
    handleTabPressItemDetails,
    itemCodeList,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    itemDetailApiFun,
    itemCodeDetails
  };
};

export default useCustomerSaleHook;
