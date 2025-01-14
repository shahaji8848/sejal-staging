import styled from '../../styles/report.module.css';
import NoRecord from '../General/NoRecord';
import ReportHeader from '../Header/ReportHeader';
import CommonFilters from './CommonReport/CommonFilters';
import ReportListingTable from './CommonReport/ReportListingTable';

const ReadyStockSummaryReport = ({
  handleReportPrint,
  readyStockSummaryReportData,
  searchInputValues,
  handleSearchInput,
  HandleSerachReport,
  clientNameData,
  karigarNameData,
  itemListData,
  categoryData,
}: any) => {
  const zeroToTwentyHeaders =
    readyStockSummaryReportData?.zeroToTwenty?.length > 0 &&
    readyStockSummaryReportData?.zeroToTwenty[0]
      ? Object.keys(readyStockSummaryReportData?.zeroToTwenty[0])
      : [];
  const twentyToFiftyHeaders =
    readyStockSummaryReportData?.twentyToFifty?.length > 0 &&
    readyStockSummaryReportData?.twentyToFifty[0]
      ? Object.keys(readyStockSummaryReportData?.twentyToFifty[0])
      : [];
  const fiftyToHundredHeaders =
    readyStockSummaryReportData?.fiftyToHundred?.length > 0 &&
    readyStockSummaryReportData?.fiftyToHundred[0]
      ? Object.keys(readyStockSummaryReportData?.fiftyToHundred[0])
      : [];
  const hundredToOnefiftyHeaders =
    readyStockSummaryReportData?.hundredToOnefifty?.length > 0 &&
    readyStockSummaryReportData?.hundredToOnefifty[0]
      ? Object.keys(readyStockSummaryReportData?.hundredToOnefifty[0])
      : [];

  return (
    <>
      <div className={` mx-4 `}>
        <ReportHeader />
        <div className="container mt-2 d-flex justify-content-end ">
          <button
            className="btn btn-outline-primary py-0 px-3"
            onClick={handleReportPrint}
          >
            Print
          </button>
        </div>
        <CommonFilters
          searchInputValues={searchInputValues}
          handleSearchInput={handleSearchInput}
          handleSearchBtn={HandleSerachReport}
          clientNameData={clientNameData}
          karigarNameData={karigarNameData}
          itemListData={itemListData}
          categoryData={categoryData}
        />
        {readyStockSummaryReportData &&
        (readyStockSummaryReportData.zeroToTwenty.length > 0 ||
          readyStockSummaryReportData.twentyToFifty.length > 0 ||
          readyStockSummaryReportData.fiftyToHundred.length > 0 ||
          readyStockSummaryReportData.hundredToOnefifty.length > 0) ? (
          <div className={`${styled.scrollable_div} text-center my-3`}>
            {readyStockSummaryReportData?.zeroToTwenty?.length > 0 && (
              <div
                className={`d-inline-block mx-5 px-3 ${
                  readyStockSummaryReportData?.zeroToTwenty?.length === 0 &&
                  'w-25'
                }`}
              >
                <h5 className="text-center my-2">0-20GMS</h5>
                <ReportListingTable
                  headers={zeroToTwentyHeaders}
                  reportData={readyStockSummaryReportData?.zeroToTwenty}
                />
              </div>
            )}

            {readyStockSummaryReportData?.twentyToFifty?.length > 0 && (
              <div
                className={`d-inline-block mx-5 px-3 ${
                  readyStockSummaryReportData?.twentyToFifty?.length === 0 &&
                  'w-25'
                }`}
              >
                <h5 className="text-center my-2">20-50GMS</h5>
                <ReportListingTable
                  headers={twentyToFiftyHeaders}
                  reportData={readyStockSummaryReportData?.twentyToFifty}
                />
              </div>
            )}
            {readyStockSummaryReportData?.fiftyToHundred?.length > 0 && (
              <div
                className={`d-inline-block mx-5 px-3 ${
                  readyStockSummaryReportData?.fiftyToHundred?.length === 0 &&
                  'w-25'
                }`}
              >
                <h5 className="text-center my-2">50-100GMS</h5>
                <ReportListingTable
                  headers={fiftyToHundredHeaders}
                  reportData={readyStockSummaryReportData?.fiftyToHundred}
                />
              </div>
            )}
            {readyStockSummaryReportData?.hundredToOnefifty?.length > 0 && (
              <div
                className={`d-inline-block mx-5 px-3 ${
                  readyStockSummaryReportData?.hundredToOnefifty?.length ===
                    0 && 'w-25'
                }`}
              >
                <h5 className="text-center my-2"> &gt; 100GMS</h5>
                <ReportListingTable
                  headers={hundredToOnefiftyHeaders}
                  reportData={readyStockSummaryReportData?.hundredToOnefifty}
                />
              </div>
            )}
          </div>
        ) : (
          <NoRecord />
        )}
      </div>
    </>
  );
};

export default ReadyStockSummaryReport;
