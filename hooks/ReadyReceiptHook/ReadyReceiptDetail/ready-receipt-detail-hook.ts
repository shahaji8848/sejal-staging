import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UseCustomReceiptHook from '@/hooks/ReadyReceiptHook/ready-receipt-custom-hook';
import PrintApi from '@/services/api/general/print-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import {
  btnLoadingStart,
  btnLoadingStop,
} from '@/store/slices/btn-loading-slice';
import {
  getSpecificReceipt,
  get_specific_receipt_data,
} from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import useReadyReceipt from '@/hooks/ReadyReceiptHook/ready-receipt-master-hook';

const UseKundanKarigarDetailHook = () => {
  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);
  const { query } = useRouter();

  const { defaultKarigarData, setDefaultKarigarData }: any =
    UseCustomReceiptHook();

  const {
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
  } = useReadyReceipt();

  const [readOnlyFields, setReadOnlyFields] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);

  const specificDataFromStore: any = useSelector(get_specific_receipt_data);

  useEffect(() => {
    if (Object?.keys(query)?.length > 0) {
      const params: any = {
        token: loginAcessToken?.token,
        name: query?.receiptId,
      };
      dispatch(getSpecificReceipt(params));
    }
  }, [query]);

  useEffect(() => {
    if (
      specificDataFromStore?.data?.length === 0 &&
      specificDataFromStore?.isLoading === 'pending'
    ) {
      setIsLoading(true);
    } else if (
      specificDataFromStore?.hasOwnProperty('data') &&
      specificDataFromStore?.isLoading === 'succeeded'
    ) {
      setIsLoading(false);
      setDefaultKarigarData([...specificDataFromStore?.data]);
    } else {
      setIsLoading(false);
      setDefaultKarigarData([]);
    }
  }, [specificDataFromStore]);

  useEffect(() => {
    if (specificDataFromStore?.docStatus > 0) {
      setReadOnlyFields(true);
    } else {
      setReadOnlyFields(false);
    }
  }, [specificDataFromStore]);

  const handlePrintApi: any = async (
    id: any,
    printApiMethod: any,
    printApiEntity: any
  ) => {
    const reqParams = {
      token: loginAcessToken?.token,
      name: id,
      version: 'v1',
      method: printApiMethod,
      entity: printApiEntity,
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

  return {
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
  };
};

export default UseKundanKarigarDetailHook;
