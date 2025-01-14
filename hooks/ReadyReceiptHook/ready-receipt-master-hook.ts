import AmendPurchaseReceiptApi from '@/services/api/PurchaseReceipt/Amend-purchase-receipt-api';
import getPurchasreceiptListApi from '@/services/api/PurchaseReceipt/get-purchase-recipts-list-api';
import purchaseReceiptApi from '@/services/api/PurchaseReceipt/post-purchase-receipt-api';
import UpdatePurchaseReceiptApi from '@/services/api/PurchaseReceipt/update-purchase-receipt-api';
import { get_material_data } from '@/store/slices/Master/get-material-slice';
import { get_warehouse_list_data, getWarehouseListData } from '@/store/slices/Master/get-warehouse-list-slice';
import { get_karigar_name_data } from '@/store/slices/Master/karigar-name-slice';
import { get_kun_karigar_name_data } from '@/store/slices/Master/kun-karigar-name-slice';
import { getSpecificReceipt } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useReadyReceiptCustomCalculationHook from './ready-receipt-custom-calculation-hook';
import useCustomReadyReceiptHook from './ready-receipt-custom-hook';
import {
  btnLoadingStart,
  btnLoadingStop,
} from '@/store/slices/btn-loading-slice';

const useReadyReceipt = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router: any = useRouter();
  const pathParts: any = router?.asPath?.split('/');
  const lastPartOfURL: any = pathParts[pathParts?.length - 1];
  const inputRef = useRef<any>(null);
  const lastInputRef = useRef<any>(null);
  const firstInputRef = useRef<any>(null);
  const [readyReceiptType, setReadyReceiptType] = useState<any>('');
  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [recipitData, setRecipitData] = useState<any>({
    custom_karigar: ' ',
    remarks: '',
    custom_ready_receipt_type: readyReceiptType,
    posting_date: '',
    set_warehouse: '',
  });

  const karigarData = useSelector(get_karigar_name_data).data;
  const kundanKarigarData = useSelector(get_kun_karigar_name_data).data;
  const materialListData = useSelector(get_material_data).data;
  const warehouseListData = useSelector(get_warehouse_list_data).data;
  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);
  const loginAcessToken = useSelector(get_access_token);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [tabDisabled, setTabDisabled] = useState<boolean>(false);
  let disabledValue: any;
  useEffect(() => {
    setRecipitData({
      ...recipitData,
      custom_ready_receipt_type: readyReceiptType,
      set_warehouse:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
    });
  }, [readyReceiptType, selectedLocation]);

  const {
    HandleDeleteReceipt,
    setKundanListing,
    kundanListing,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    stateForDocStatus,
    setStateForDocStatus,
    readOnlyFields,
    setReadOnlyFields,
    HandleUpdateDocStatus,
    tableData,
    setTableData,
    materialWeight,
    setMaterialWeight,
    handleClearFileUploadInput,
    calculateEditTotal,
    handleDeleteRow,
    handleDeleteChildTableRow,
    calculateRowValue,
    handleModal,
    indexVal,
    showModal,
    setShowModal,
    handleFieldChange,
    purchasRecieptListParams,
    initialTableState,
    handleAddRow,
    setMatWt,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    specificDataFromStore,
    handleModalFieldChange,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useCustomReadyReceiptHook();

  const {
    calculateWtForCreateReceipt,
    calculateTableDataForUpdateReceipt,
    calculateTableDataForAmendReceipt,
    filteredTableDataForUpdate,
    calculateReadyReceiptModalData,
  }: any = useReadyReceiptCustomCalculationHook();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (tabDisabled && event.key === 'Tab') {
        event.preventDefault(); // Prevent default Tab behavior
      }
    };

    window.addEventListener('keydown', handleKeyDown); // Add event listener

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup on component unmount
    };
  }, [tabDisabled]);

  useEffect(() => {
    const getPurchaseList = async () => {
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };
      if (Object?.keys(query)?.length > 0) {
        const listData = await getPurchasreceiptListApi(
          loginAcessToken,
          capitalizeFirstLetter(query.receipt)
        );

        if (listData?.data?.message?.status === 'success') {
          setKundanListing(listData?.data?.message?.data);
        }
      }
    };
    getPurchaseList();
    dispatch(getWarehouseListData(loginAcessToken?.token))
  }, [router]);

  const handleSaveModal = async (id: any) => {
    const modalValue = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        weight,
        gm_,
        amount,
        id,
        ...rest
      }: any) => ({
        ...rest,
      })
    );

    if (inputRef?.current) {
      disabledValue = inputRef.current.value;
    } else {
    }

    const totalAmmount = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        gm_,
        id,
        material_abbr,
        material,
        weight,
        ...rest
      }: any) => ({ ...rest })
    );

    const { updatedDataVal }: any = calculateReadyReceiptModalData({
      materialWeight,
      tableData,
      indexVal,
    });

    setTableData(updatedDataVal);
    setShowModal(false);
    setStateForDocStatus(true);
    setMatWt('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRecipietChange = (e: any) => {
    setRecipitData({ ...recipitData, [e.target.name]: e.target.value });
    setStateForDocStatus(true);
  };

  const handleTabPressOnModal = (event: any, id: any) => {
    if (event.key === 'Tab') {
      handleAddRow('modalRow');
    }
    setStateForDocStatus(true);
  };

  const handleTabPress = (event: any, id: any, keyValue: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].idx) {
      handleAddRow('tableRow');
    }
    setStateForDocStatus(true);
    firstInputRef?.current?.focus();
  };

  const handleCreate = async () => {
    if (tabDisabled) {
      return;
    }
    setTabDisabled(true);
    const updatedTableData: any = calculateWtForCreateReceipt({
      tableData,
      indexVal,
    });
    const modalValue: any = updatedTableData?.map(
      ({ id, totalModalWeight, totalAmount, totalModalPcs, ...rest }: any) => {
        if (!rest.hasOwnProperty('custom_kun_karigar')) {
          return { ...rest, custom_kun_karigar: 'default_value' };
        }
        return rest;
      }
    );
    const values = {
      version: 'v1',
      method: 'create_purchase_receipt',
      entity: 'purchase_receipt',
      ...recipitData,
      items: modalValue,
    };

    const isEmptyProductCode = values?.items?.some(
      (obj: any) => obj.product_code === ''
    );
    const isEmptyNetWt = values?.items?.some(
      (obj: any) => obj.custom_net_wt === 0
    );
    const productVal = values.custom_karigar;

    if (isEmptyProductCode) {
      toast.error('Please fill all the required fields');
      setTabDisabled(false);
    } else if (isEmptyNetWt) {
      toast.error('Please fill all the required fields');
      setTabDisabled(false);
    } else if (productVal === ' ') {
      toast.error('Mandatory field Karigar');
      setTabDisabled(false);
    } else {
      dispatch(btnLoadingStart());
      const purchaseReceipt: any = await purchaseReceiptApi(
        loginAcessToken.token,
        values
      );
      if (purchaseReceipt?.data?.message?.status === 'success') {
        router.push(
          `${readyReceiptType?.toLowerCase()}/${purchaseReceipt?.data?.message
            ?.message}`
        );
        dispatch(btnLoadingStop());
        toast.success('Purchase Receipt Created Successfully');
        setTabDisabled(false);
      } else {
        dispatch(btnLoadingStop());
        setTabDisabled(false);
        toast.error(`${purchaseReceipt?.data?.message?.message}`);
      }
    }
  };

  const HandleEmptyReadyReceiptForm: any = () => {
    setRecipitData({
      custom_karigar: ' ',
      remarks: '',
      custom_ready_receipt_type: readyReceiptType,
      posting_date: '',
      set_warehouse: 'Mumbai',
    });
    setTableData([initialTableState]);
    setSelectedDropdownValue('');
    setSelectedKundanKarigarDropdownValue('');
    setKunKarigarDropdownReset(true);
  };

  const handleUpdateReceipt: any = async () => {
    if (tabDisabled) {
      return;
    }
    setTabDisabled(true);
    const filteredDataa = filteredTableDataForUpdate(tableData);
    const updatedTableData: any = calculateTableDataForUpdateReceipt({
      filteredDataa,
      indexVal,
    });

    const updatedMergedList = updatedTableData.map((obj: any) => ({
      ...obj,
      custom_purchase_receipt_item_breakup: '',
      item_group: 'All Item Groups',
    }));

    const values = {
      version: 'v1',
      method: 'put_purchase_receipt',
      entity: 'purchase_receipt',
      ...recipitData,
      items: updatedMergedList,
    };

    const keyToExclude = ['posting_date'];

    const updatedReceiptData: any = { ...values };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);
    dispatch(btnLoadingStart());
    let updateReceiptApi: any = await UpdatePurchaseReceiptApi(
      loginAcessToken.token,
      updatedReceiptData,
      query?.receiptId
    );

    if (updateReceiptApi?.data?.hasOwnProperty('message')) {
      if (updateReceiptApi?.data?.message?.hasOwnProperty('name')) {
        setStateForDocStatus(false);
        const params: any = {
          token: loginAcessToken?.token,
          name: query?.receiptId,
        };
        dispatch(getSpecificReceipt(params));
        dispatch(btnLoadingStop());
        setTabDisabled(false);
      } else {
        toast.error(`${updateReceiptApi?.data?.message?.error}`);
        dispatch(btnLoadingStop());
        setTabDisabled(false);
      }
    }
  };

  const handleAmendButtonForDuplicateChitti: any = async () => {
    const updatedTableData: any = calculateTableDataForAmendReceipt({
      tableData,
      indexVal,
    });
    // Change key name from 'product_code' to 'item_code' in the tableData
    const updatedTableDataWithRenamedKey = updatedTableData?.map((row: any) => {
      return {
        ...row,
        item_code: row.product_code,
      };
    });

    // List of keys to be excluded from the API request
    const keyToExclude = ['docstatus'];

    const updatedReceiptData: any = { ...recipitData };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);

    const values = {
      ...updatedReceiptData,
      amended_from: lastPartOfURL,
      items: updatedTableDataWithRenamedKey,
    };
    try {
      let amendReceiptApi: any = await AmendPurchaseReceiptApi(
        loginAcessToken.token,
        values,
        query?.receiptId
      );

      if (amendReceiptApi?.data?.hasOwnProperty('data')) {
        const newURL = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;
        const asPath = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;

        // Update the URL with the required query parameter
        router.push(newURL, asPath);
        setStateForDocStatus(false);
        setShowSaveButtonForAmendFlow(false);
      } else {
      }
    } catch (error) { }
  };

  return {
    kundanListing,
    handleCreate,
    handleRecipietChange,
    handleAddRow,
    recipitData,
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
    setMaterialWeight,
    closeModal,
    handleSaveModal,
    showModal,
    lastPartOfURL,
    HandleDeleteReceipt,
    selectedDropdownValue,
    setSelectedDropdownValue,
    readyReceiptType,
    setReadyReceiptType,
    stateForDocStatus,
    setStateForDocStatus,
    indexVal,
    handleUpdateReceipt,
    readOnlyFields,
    setReadOnlyFields,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    HandleUpdateDocStatus,
    setKundanListing,
    handleAmendButtonForDuplicateChitti,
    handleTabPressOnModal,
    HandleEmptyReadyReceiptForm,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    kunKarigarDropdownReset,
    setKunKarigarDropdownReset,
    calculateEditTotal,
    handleClearFileUploadInput,
    purchasRecieptListParams,
    lastInputRef,
    firstInputRef,
    setMatWt,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    specificDataFromStore,
    tabDisabled,
    showDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  };
};

export default useReadyReceipt;
