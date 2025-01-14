import React from 'react';
import styled from '../../styles/report.module.css';

const DailyReportHeader = () => {
  return (
    <>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        Karigar
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        RR Gross Wt
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        RR Net Wt
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        RR Qty
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        Client
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        Sales Gross Wt
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        Sales Net Wt
      </th>
      <th scope="col" className={`thead col ${styled.table_header}`}>
        Sales Qty
      </th>
    </>
  );
};

export default DailyReportHeader;
