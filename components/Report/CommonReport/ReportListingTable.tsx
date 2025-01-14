import React from 'react';
import { useRouter } from 'next/router';
import styled from '../../../styles/report.module.css';
import DailyReportHeader from '../DailyReportHeader';

const ReportListingTable = ({ headers, reportData }: any) => {
  const { query } = useRouter();

  return (
    <div className="row justify-content-center mt-3">
      <div className={`col table-responsie m-auto ${styled.table_container}`}>
        <table className="table table-hover table-striped cursor ">
          <thead className="sticky-top">
            <tr className="row row-cols-7 justify-content-center">
              <th scope="col" className="thead col-1">
                Sr. No.
              </th>
              {query.reportId !== 'daily-qty-status' ? (
                <>
                  {headers?.map((header: string, index: number) => (
                    <th
                      key={index}
                      scope="col"
                      className={`thead col ${styled.table_header}`}
                    >
                      {header?.charAt(0)?.toUpperCase() +
                        header?.slice(1)?.replace(/_/g, ' ')}
                    </th>
                  ))}
                </>
              ) : (
                <DailyReportHeader />
              )}
            </tr>
          </thead>
          <tbody>
            {reportData
              .slice(0, query.reportId === 'daily-qty-status' ? -2 : -1)
              // Excludes the last row
              .map((data: any, index: any) => {
                const firstKey = Object.keys(data)[0];
                const isTotalRow = data[firstKey] === 'Total';

                return (
                  <tr
                    key={index}
                    className={`row row-cols-7 justify-content-center text-center ${
                      isTotalRow ? 'fw-bold bg-warning ' : ''
                    }`}
                  >
                    <td scope="col" className="col-1 table_row py-1 py-auto">
                      {!isTotalRow && index + 1}
                    </td>
                    {headers.map((header: any, idx: any) => (
                      <td
                        key={idx}
                        scope="col"
                        className={`table_row py-1 py-auto col `}
                      >
                        {data[header]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            {/* Render the last row separately */}
          </tbody>
        </table>
        {reportData.length > 0 && (
          <div className={`sticky-bottom `}>
            <table className={`table table-hover table-striped cursor`}>
              <tbody>
                {query.reportId === 'daily-qty-status' && (
                  <tr className="row row-cols-7 justify-content-center text-center fw-bold mb-3">
                    <td
                      scope="col"
                      className={`col-1 table_row py-1 py-auto ${styled.total_row_container}`}
                    ></td>
                    {headers.map((header: any, idx: any) => (
                      <td
                        key={idx}
                        scope="col"
                        className={`table_row py-1 py-auto ${styled.total_row_container} col`}
                      >
                        {reportData[reportData.length - 2][header]}
                      </td>
                    ))}
                  </tr>
                )}
                <tr className="row row-cols-7 justify-content-center text-center fw-bold">
                  <td
                    scope="col"
                    className={`col-1 table_row py-1 py-auto ${styled.total_row_container}`}
                  ></td>
                  {headers.map((header: any, idx: any) => (
                    <td
                      key={idx}
                      scope="col"
                      className={`table_row py-1 py-auto ${styled.total_row_container} col`}
                    >
                      {reportData[reportData.length - 1][header]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportListingTable;
