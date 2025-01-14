import React from 'react';

import styled from '../../styles/report.module.css';

const DetailedSummaryReportListingTable = ({ headers, reportData }: any) => {
  return (
    <div className="container row justify-content-center mt-3">
      <div className={`col-8 table-responsie m-auto ${styled.table_container}`}>
        <table className="table table-hover table-striped cursor ">
          <thead className="sticky-top">
            <tr className="row row-cols-7 justify-content-center">
              <th scope="col" className="thead col-1">
                Sr. No.
              </th>
              <th scope="col" className={`thead col ${styled.table_header}`}>
                Category
              </th>
              <th scope="col" className={`thead col ${styled.table_header}`}>
                Sub Category
              </th>
              <th scope="col" className={`thead col ${styled.table_header}`}>
                Item Code
              </th>

              <th scope="col" className={`thead col ${styled.table_header}`}>
                Gross Weight
              </th>
              <th scope="col" className={`thead col ${styled.table_header}`}>
                Net Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {reportData
              .slice(0, -1)
              // Excludes the last row
              .map((data: any, index: any) => {
                const firstKey = Object.keys(data)[0];
                const isTotalRow = data[firstKey] === 'Total';

                return (
                  <tr
                    key={index}
                    className={`row justify-content-center text-center ${
                      isTotalRow ? 'fw-bold bg-warning ' : ''
                    }`}
                  >
                    <td scope="col" className="col-1 table_row py-1 py-auto">
                      {!isTotalRow && index + 1}
                    </td>
                    <td scope="col" className={`table_row py-1 py-auto col `}>
                      {data.category}
                    </td>
                    <td scope="col" className={`table_row py-1 py-auto col `}>
                      {data.sub_category}
                    </td>
                    <td scope="col" className={`table_row py-1 py-auto col `}>
                      {data.product_code}
                    </td>

                    <td scope="col" className={`table_row py-1 py-auto col `}>
                      {data.gross_weight}
                    </td>
                    <td scope="col" className={`table_row py-1 py-auto col `}>
                      {data.net_weight}
                    </td>
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
                <tr className="row justify-content-center text-center fw-bold">
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

export default DetailedSummaryReportListingTable;
