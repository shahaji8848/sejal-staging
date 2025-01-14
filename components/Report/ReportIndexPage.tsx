import { useRouter } from 'next/router';
import useReportHook from '@/hooks/Report/report-hook';
import CommonReport from './CommonReport/CommonReport';
import ReadyStockSummaryReport from './ReadyStockSummaryReport';

const ReportIndexPage = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const key = pathcontent[pathcontent?.length - 1];
  const {
    setSelectDropDownReset,
    itemList,
    handleSearchInput,
    searchInputValues,
    isLoading,
    handleSearchReport,
    reportData,
    clientNameData,
    karigarNameData,
    categoryData,
    readyStockSummaryReportData,
    handleReportPrint,
  }: any = useReportHook();
  return (
    <>
      {key === 'ready-stock-summary-report' ? (
        <ReadyStockSummaryReport
          reportData={reportData}
          readyStockSummaryReportData={readyStockSummaryReportData}
          isLoading={isLoading}
          searchInputValues={searchInputValues}
          handleSearchInput={handleSearchInput}
          HandleSerachReport={handleSearchReport}
          setSelectDropDownReset={setSelectDropDownReset}
          clientNameData={clientNameData}
          karigarNameData={karigarNameData}
          itemListData={itemList}
          categoryData={categoryData}
          handleReportPrint={handleReportPrint}
        />
      ) : (
        <CommonReport
          reportData={reportData}
          isLoading={isLoading}
          searchInputValues={searchInputValues}
          handleSearchInput={handleSearchInput}
          HandleSerachReport={handleSearchReport}
          setSelectDropDownReset={setSelectDropDownReset}
          clientNameData={clientNameData}
          karigarNameData={karigarNameData}
          itemListData={itemList}
          categoryData={categoryData}
          handleReportPrint={handleReportPrint}
        />
      )}
    </>
  );
};

export default ReportIndexPage;
