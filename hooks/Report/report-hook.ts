import getItemListInSalesApi from '@/services/api/Sales/get-item-list-api';
import CustomerWiseReportApi from '@/services/api/report/get-customer-wise-report-api';
import DailyStatusReportApi from '@/services/api/report/get-daily-status-report-data-api';
import detailedSummaryReportApi from '@/services/api/report/get-detailed-summary-report-api';
import KarigarWiseReportApi from '@/services/api/report/get-karigar-wise-report-api';
import ProductCodeReportApi from '@/services/api/report/get-product-code-report';
import {
  readyStockSummaryApi0_20,
  readyStockSummaryApi100_150,
  readyStockSummaryApi20_50,
  readyStockSummaryApi50_100,
} from '@/services/api/report/get-ready-stock-summary-report-api';
import summaryReport from '@/services/api/report/get-summary-report-api';
import {
  customerWiseReportPrintApi,
  dailyReportPrintApi,
  detailedSummaryReportPrintApi,
  karigarWiseReportPrintApi,
  productReportPrintApi,
  readyStockSummaryReportPrintApi,
  summaryReportPrintApi,
} from '@/services/api/report/report-print-api';
import { get_client_name_data } from '@/store/slices/Master/get-client-name-slice';
import { get_sub_category_data } from '@/store/slices/Master/get-sub-category-slice';
import { get_karigar_name_data } from '@/store/slices/Master/karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useReportHook = () => {
  const router = useRouter();
  const { query } = useRouter();

  // access token
  const loginAccessToken: any = useSelector(get_access_token);
  // filter states
  const [searchItem, setSearchItem] = useState<string>('');
  const [searchVoucherNum, setSearchVoucherNum] = useState<string>('');
  const [searchName, setSearchName] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] = useState<string>('');
  const todayDate: any = new Date()?.toISOString()?.split('T')[0];

  const [searchInputValues, setSearchInputValues] = useState<any>({
    from_date: todayDate,
    to_date: todayDate,
  });
  const [itemCodeSearchValues, setItemCodeSearchValues] = useState<any>({
    name: '',
    karigar: '',
  });

  // report data states
  const [reportData, setReportData] = useState<any>([]);
  const [readyStockSummaryReportData, setReadyStockSummaryReportData] =
    useState<any>({
      zeroToTwenty: [],
      twentyToFifty: [],
      fiftyToHundred: [],
      hundredToOnefifty: [],
    });
  const clientNameData = useSelector(get_client_name_data).data;
  let karigarNameData = useSelector(get_karigar_name_data).data;
  const categoryData = useSelector(get_sub_category_data).data;

  const [itemList, setItemList] = useState<any>();

  // loader state
  const [isLoading, setIsLoading] = useState<number>(0);

  const HandleRefresh = () => {
    router.reload();
  };

  const getStateData = async (date?: any) => {
    let reportData;
    const currentDate: any = { from_date: todayDate, to_date: todayDate };
    //remove date keys
    let removeDateFilters: any = Object.fromEntries(
      Object.entries(searchInputValues).filter(
        ([key]) => key !== 'from_date' && key !== 'to_date'
      )
    );

    if (query?.reportId === 'daily-qty-status') {
      reportData = await DailyStatusReportApi(
        loginAccessToken.token,
        date ? currentDate : searchInputValues
      );
    } else if (query?.reportId === 'product-code') {
      reportData = await ProductCodeReportApi(
        loginAccessToken.token,
        removeDateFilters
      );
      const itemListData = await getItemListInSalesApi(loginAccessToken.token);
      if (itemListData?.data?.data?.length > 0) {
        let itemList: any = itemListData?.data?.data.map(
          (items: any) => items.name
        );
        setItemList(itemList);
      }
    } else if (query?.reportId === 'detailed-summary-report') {
      reportData = await detailedSummaryReportApi(
        loginAccessToken.token,
        removeDateFilters
      );
      const itemListData = await getItemListInSalesApi(loginAccessToken.token);
      if (itemListData?.data?.data?.length > 0) {
        let itemList: any = itemListData?.data?.data.map(
          (items: any) => items.name
        );
        setItemList(itemList);
      }
    } else if (query?.reportId === 'customer-wise-report') {
      reportData = await CustomerWiseReportApi(
        loginAccessToken.token,
        date ? currentDate : searchInputValues
      );
    } else if (query?.reportId === 'karigar-wise-report') {
      reportData = await KarigarWiseReportApi(
        loginAccessToken.token,
        date ? currentDate : searchInputValues
      );
    } else if (query?.reportId === 'summary-report') {
      reportData = await summaryReport(
        loginAccessToken.token,
        date ? currentDate : searchInputValues
      );
    } else if (query?.reportId === 'ready-stock-summary-report') {
      fetchReadyStockSummaryReportData();
    }

    if (reportData?.data?.message?.status === 'success') {

      setReportData(reportData?.data?.message?.data);
      if (reportData?.data?.message?.data?.length > 0) {
        setIsLoading(1);
      } else {
        setIsLoading(2);
      }
    } else {
      setReportData([]);
      setIsLoading(2);
    }
  };

  const fetchReadyStockSummaryReportData = async () => {
    try {
      setIsLoading(1);
      const [
        readyStockData1,
        readyStockData2,
        readyStockData3,
        readyStockData4,
      ] = await Promise.all([
        readyStockSummaryApi0_20(loginAccessToken.token, searchInputValues),
        readyStockSummaryApi20_50(loginAccessToken.token, searchInputValues),
        readyStockSummaryApi50_100(loginAccessToken.token, searchInputValues),
        readyStockSummaryApi100_150(loginAccessToken.token, searchInputValues),
      ]);
      setIsLoading(0);
      setReadyStockSummaryReportData({
        zeroToTwenty:
          readyStockData1?.data?.message?.status === 'success'
            ? readyStockData1?.data?.message?.data
            : [],
        twentyToFifty:
          readyStockData2?.data?.message?.status === 'success'
            ? readyStockData2?.data?.message?.data
            : [],
        fiftyToHundred:
          readyStockData3?.data?.message?.status === 'success'
            ? readyStockData3?.data?.message?.data
            : [],
        hundredToOnefifty:
          readyStockData4?.data?.message?.status === 'success'
            ? readyStockData4?.data?.message?.data
            : [],
      });
    } catch (error) {

      setIsLoading(0);
    }
  };

  useEffect(() => {
    getStateData('date');
    setSearchInputValues({
      from_date: todayDate,
      to_date: todayDate,
    });
  }, [query]);

  const dailyStatusSearchName: any =
    reportData?.length > 0 &&
    reportData !== null &&
    reportData.map((data: any) => ({
      karigar_name: data.name,
    }));

  const handleReportPrint = async () => {
    let removeDateFilters: any = Object.fromEntries(
      Object.entries(searchInputValues).filter(
        ([key]) => key !== 'from_date' && key !== 'to_date'
      )
    );

    try {
      let reportPrint;
      switch (query?.reportId) {
        case 'daily-qty-status':
          reportPrint = await dailyReportPrintApi(
            loginAccessToken.token,
            searchInputValues
          );
          break;
        case 'product-code':
          reportPrint = await productReportPrintApi(
            loginAccessToken.token,
            removeDateFilters
          );
          break;
        case 'detailed-summary-report':
          reportPrint = await detailedSummaryReportPrintApi(
            loginAccessToken.token,
            removeDateFilters
          );
          break;
        case 'customer-wise-report':
          reportPrint = await customerWiseReportPrintApi(
            loginAccessToken.token,
            searchInputValues
          );
          break;
        case 'karigar-wise-report':
          reportPrint = await karigarWiseReportPrintApi(
            loginAccessToken.token,
            searchInputValues
          );
          break;
        case 'summary-report':
          reportPrint = await summaryReportPrintApi(
            loginAccessToken.token,
            searchInputValues
          );
          break;
        case 'ready-stock-summary-report':
          reportPrint = await readyStockSummaryReportPrintApi(
            loginAccessToken.token,
            searchInputValues
          );
          break;
        default:
          return;
      }

      if (reportPrint?.data?.message?.status === 'success') {
        window.open(reportPrint?.data?.message?.data?.print_url);
      } else {
        toast.error('Failed to Print');
      }
    } catch (error) {
      console.error('Error fetching report print:', error);
    }
  };

  const handleSearchInput: any = (value: any, fieldName: any) => {
    setSearchInputValues((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleItemCodeSearchInput: any = (e: any) => {
    const { name, value } = e.target;
    setItemCodeSearchValues({
      ...itemCodeSearchValues,
      [name]: value,
    });
  };

  const handleSearchReport = async () => {
    getStateData();
  };

  return {
    setSearchItem,
    searchItem,
    selectDropDownReset,
    setSelectDropDownReset,
    searchVoucherNum,
    setSearchVoucherNum,
    dailyStatusSearchName,
    itemList,
    handleSearchInput,
    searchInputValues,
    HandleRefresh,
    isLoading,
    searchName,
    setSearchName,
    handleReportPrint,
    handleSearchReport,
    reportData,
    itemCodeSearchValues,
    setItemCodeSearchValues,
    handleItemCodeSearchInput,
    clientNameData,
    karigarNameData,
    categoryData,
    readyStockSummaryReportData,
  };
};
export default useReportHook;
