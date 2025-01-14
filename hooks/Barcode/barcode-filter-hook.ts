import getBarcodeDetailsApi from '@/services/api/Barcode/barcode-details-by-item-code-api';
import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';
import PostCreateBarcodeApi from '@/services/api/Barcode/post-create-barcode-api';
import getSearchBarcodeItemCodeDetails from '@/services/api/Barcode/search-barcode-itemcode-details-api';
import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import { get_bb_category_data } from '@/store/slices/Master/get-bb-category-slice';
import { get_kun_category_data } from '@/store/slices/Master/get-kun-category-slice';
import { get_karigar_name_data } from '@/store/slices/Master/karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useBarcodeListingHook from './barcode-listing-hook';
import UseBarcodeTableHook from './barcode-table-hook';

const UseBarcodeFilterList = () => {
  const loginAcessToken = useSelector(get_access_token);
  const karigarList = useSelector(get_karigar_name_data).data
  const kunCsOtCategoryData = useSelector(get_kun_category_data).data
  const BBcategoryData = useSelector(get_bb_category_data).data
  const [searchKarigar, setSearchKarigar] = useState<any>();
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  const [showCategorySection, setShowCategorySection] =
    useState<boolean>(false);
  const [showBarcodeTableSection, setShowBarcodeTableSection] =
    useState<boolean>(false);
  const [itemCodeDataToShow, setItemCodeDataToShow] = useState<any>([]);
  const [checkedItems, setCheckedItems] = useState<any>([]);

  const [searchBarcodeFilterData, setSearchBarcodeFilterData] = useState<any>({
    date: '',
    // karigar: "",
    item_group: '',
    sr_no_from: '',
    sr_no_to: '',
    stock: '',
    barcode_created: '',
  });
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });

  const {
    salesTableData,
    setSalesTableData,
    SalesTableInitialState,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    setItemList,
    itemList,
    selectedItemCode,
    setSelectedItemCode,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
  }: any = UseBarcodeTableHook();
  const {
    BarcodeListData,
    setBarcodeListData,
    handleCheckboxForBarcodePrint,
    handleMultipleBarcodePrint,
    multipleRecordsForPrint,
    handleBarcodePrint,
    selectAll,
    setSelectAll,
    handleSelectAll,
  }: any = useBarcodeListingHook();

  useEffect(() => {
    const getStateData: any = async () => {
      let itemListApi: any = await getItemListInSalesApi(loginAcessToken.token);
      if (itemListApi?.data?.data?.length > 0) {
        setItemList(itemListApi?.data?.data);
      }
    };
    getStateData();
  }, []);

  const handleSearchBarcodeItemCodeDetails = (e: any, fieldName: any) => {
    let value = e.target.value;
    if (fieldName === 'date') {
      if (Object?.keys(value)?.length > 0) {
        const dateObj = new Date(value);
        const formattedDate = `${dateObj.getDate()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getFullYear()}`;
        value = formattedDate;
      }
    }
    setSearchBarcodeFilterData((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSearchBtn: any = async () => {
    let searchBarcodeItemCodeDetailsApi: any =
      await getSearchBarcodeItemCodeDetails(
        searchBarcodeFilterData,
        searchKarigar !== undefined ? searchKarigar : '',
        loginAcessToken?.token
      );

    if (searchBarcodeItemCodeDetailsApi?.data?.message?.status === 'success') {
      const getBarcodeListingData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      let barcodeListingDataResult: any =
        getBarcodeListingData?.data?.message?.data;
      let searchBarcodeItemDetailsResult: any =
        searchBarcodeItemCodeDetailsApi?.data?.message?.data;

      const checkItemCodesToShow: any =
        searchBarcodeItemDetailsResult?.length > 0 &&
        searchBarcodeItemDetailsResult.filter((data: any) => {
          return (
            barcodeListingDataResult?.length > 0 &&
            barcodeListingDataResult.some(
              (barcodeItem: any) => barcodeItem.item_code === data.item_code
            )
          );
        });

      if (searchBarcodeFilterData.barcode_created === 'yes') {
        setItemCodeDataToShow(checkItemCodesToShow);
        const ids =
          checkItemCodesToShow?.length > 0 &&
          checkItemCodesToShow.map((item: any, index: any) => ({
            id: index,
            name: item.item_code,
          }));
        setCheckedItems(ids);
      } else {
        setItemCodeDataToShow(searchBarcodeItemDetailsResult);
        const ids =
          searchBarcodeItemDetailsResult?.length > 0 &&
          searchBarcodeItemDetailsResult.map((item: any, index: any) => ({
            id: index,
            name: item.item_code,
          }));
        setCheckedItems(ids);
      }
    }
    setShowCategorySection(true);
    setShowBarcodeTableSection(false);
  };
  const handleGenerateBarcodeListBtn: any = async () => {
    setShowCategorySection(false);
    setShowBarcodeTableSection(true);

    const reqParams: any = {
      version: 'v1',
      method: 'get_item_specific_barcode',
      entity: 'barcode',
      name:
        checkedItems?.length > 0 &&
        checkedItems !== null &&
        checkedItems.map((items: any) => items.name),
    };

    let getBarcodeDetails: any = await getBarcodeDetailsApi(
      loginAcessToken?.token,
      reqParams
    );

    if (
      getBarcodeDetails?.data?.message?.message?.status === 'success' &&
      Object.keys(getBarcodeDetails?.data?.message?.message?.data)?.length > 0
    ) {
      const data: any = getBarcodeDetails?.data?.message?.message?.data;
      const newData: any = Object.values(data).flatMap(
        (item: any, index: any) =>
          item.map((innerItem: any) => ({
            ...innerItem,
            idx: index + 1,
            custom_kun_wt: Number(
              selectedCategory.KunCategory !== '' &&
                selectedCategory?.KunCategory !== undefined
                ? (innerItem?.custom_kun_wt *
                    selectedCategory.KunCategory.type) /
                    100
                : innerItem?.custom_kun_wt
            ),
            custom_cs_wt: Number(
              selectedCategory.CsCategory !== '' &&
                selectedCategory?.CsCategory !== undefined
                ? (innerItem?.custom_cs_wt * selectedCategory.CsCategory.type) /
                    100
                : innerItem?.custom_cs_wt
            ),
            custom_bb_wt: Number(
              selectedCategory.BBCategory !== '' &&
                selectedCategory?.BBCategory !== undefined
                ? innerItem?.custom_bb_wt - selectedCategory.BBCategory.type
                : innerItem.custom_bb_wt
            ),
            custom_other_wt: Number(
              selectedCategory.OtCategory !== '' &&
                selectedCategory?.OtCategory !== undefined
                ? (innerItem?.custom_other_wt *
                    selectedCategory.OtCategory.type) /
                    100
                : innerItem?.custom_other_wt
            ),
            custom_net_wt:
              Number(innerItem?.custom_gross_wt) -
              Number(innerItem?.custom_kun_wt) +
              Number(innerItem?.custom_cs_wt) +
              Number(innerItem?.custom_bb_wt) +
              Number(innerItem?.custom_other_wt),
            custom_cs: '',
            custom_cs_amt: 0,
            custom_kun: '',
            custom_kun_pc: innerItem?.custom_kun_pcs,
            custom_kun_amt: 0,
            custom_ot_: '',
            custom_ot_amt: 0,
            custom_other: '',
            custom_amount: 0,
          }))
      );
      setSalesTableData(newData);
    } else {
      setSalesTableData([SalesTableInitialState]);
    }
  };
  const handleBarcodeTableFieldChange: any = (
    itemIdx: number,
    fieldName: string,
    value: any
  ) => {
    setSalesTableData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.idx === itemIdx) {
          return {
            ...item,
            [fieldName]: Number(value),
            custom_net_wt:
              Number(item?.custom_gross_wt) -
                (Number(item?.custom_kun_wt) +
                  Number(item?.custom_cs_wt) +
                  Number(item?.custom_bb_wt) +
                  Number(item?.custom_other_wt)) <
              0
                ? 0
                : Number(item?.custom_gross_wt) -
                  (Number(item?.custom_kun_wt) +
                    Number(item?.custom_cs_wt) +
                    Number(item?.custom_bb_wt) +
                    Number(item?.custom_other_wt)),
            custom_cs_amt:
              fieldName === 'custom_cs'
                ? Number(item.custom_cs_wt) * value
                : item.custom_cs_amt,
            custom_kun_amt:
              fieldName === 'custom_kun'
                ? Number(item?.custom_kun_pc) * value
                : fieldName === 'custom_kun_pc'
                ? Number(item.custom_kun) * value
                : item.custom_kun_amt,
            custom_ot_amt:
              fieldName === 'custom_ot_'
                ? Number(item.custom_other_wt) * value
                : item.custom_ot_amt,
            custom_amount: Number(
              Number(
                Number(item?.custom_kun_amt) === undefined
                  ? 0
                  : Number(item?.custom_kun_amt)
              ) +
                Number(
                  Number(item?.custom_cs_amt) === undefined
                    ? 0
                    : Number(item?.custom_cs_amt)
                ) +
                Number(
                  Number(item?.custom_ot_amt) === undefined
                    ? 0
                    : Number(item?.custom_ot_amt)
                ) +
                Number(item?.custom_other)
            ),
          };
        } else {
          return item;
        }
      });
    });
  };
  const handleCheckboxChange = (id: any, name: any) => {

    setCheckedItems((prevItems: any) => {
      const index = prevItems.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        // If checkbox is already checked, remove it from the list
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      } else {
        // If checkbox is not checked, add it to the list
        return [...prevItems, { id, name }];
      }
    });
  };


  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    const selectedArray =
      name === 'BBCategory' ? BBcategoryData : kunCsOtCategoryData;
    const selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);

    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));
    // setStateForDocStatus(true);
  };

  const HandleCreateBarcode = async () => {

    const updatedData =
      salesTableData?.length > 0 &&
      salesTableData !== null &&
      salesTableData.map((item: any) => {
        const { custom_warehouse, idx, ...updatedObject } = item;
        return {
          ...updatedObject,
          custom_bb_wt: item?.custom_bb_wt < 0 ? 0 : item?.custom_bb_wt,
          custom_amount: Number(
            Number(
              Number(item?.custom_kun_amt) === undefined
                ? 0
                : Number(item?.custom_kun_amt)
            ) +
              Number(
                Number(item?.custom_cs_amt) === undefined
                  ? 0
                  : Number(item?.custom_cs_amt)
              ) +
              Number(
                Number(item?.custom_ot_amt) === undefined
                  ? 0
                  : Number(item?.custom_ot_amt)
              ) +
              Number(item?.custom_other)
          ),
        };
      });
    const values = {
      version: 'v1',
      method: 'create_barcode',
      entity: 'barcode',
      data: updatedData,
    };
    const createNewBarcodeApi: any = await PostCreateBarcodeApi(
      loginAcessToken.token,
      values
    );

    if (createNewBarcodeApi?.data?.message?.status === 'success') {
      toast.success('Barcode Created Successfully');
      const BarcodeData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      if (BarcodeData?.data?.message?.status === 'success') {
        setBarcodeListData(BarcodeData?.data?.message?.data);
      }
      handleMultipleBarcodePrint(updatedData);
    }
    if (createNewBarcodeApi?.data?.message?.status === 'error') {
      toast.error(`${createNewBarcodeApi?.data?.message?.error}`);
    }
  };
  const handleTabPress = () => {};

  const handleAddRowForSales: any = () => {};
  const handleDeleteRowOfSalesTable: any = () => {};
  return {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
    handleSearchBarcodeItemCodeDetails,
    handleSearchBtn,
    itemCodeDataToShow,
    showCategorySection,
    handleGenerateBarcodeListBtn,
    showBarcodeTableSection,
    handleCheckboxChange,
    checkedItems,
    kunCsOtCategoryData,
    BBcategoryData,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    salesTableData,
    setSalesTableData,
    itemCodeDropdownReset,
    setItemCodeDropdownReset,
    handleBarcodeTableFieldChange,
    HandleCreateBarcode,
    setItemList,
    itemList,
    selectedItemCode,
    setSelectedItemCode,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    handleTabPress,
    BarcodeListData,
    handleCheckboxForBarcodePrint,
    handleMultipleBarcodePrint,
    multipleRecordsForPrint,
    handleBarcodePrint,
    selectAll,
    setSelectAll,
    handleSelectAll,
  };
};
export default UseBarcodeFilterList;
