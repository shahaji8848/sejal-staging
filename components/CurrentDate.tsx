import React, { useState } from 'react';

const CurrentDate = ({ defaultKarigarData, defaultSalesDate }: any) => {
  const formatDate = (inputDate: Date) => {
    const formattedDate = inputDate
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-');
    return formattedDate;
  };

  const getDate = () => {
    const today = new Date()
    return formatDate(today);
  };

  const [currentDate, setCurrentDate] = useState(getDate());

  const CurrentDateValue: any = () => {
    if (defaultKarigarData !== undefined && defaultKarigarData.length > 0) {
      const postingDate = defaultKarigarData[0]?.posting_date;
      return postingDate;
    } else if (defaultSalesDate !== undefined) {
      const postingDateForSales = defaultSalesDate;
      return postingDateForSales;
    } else {
      return currentDate;
    }
  };

  return (
    <input
      type="text border border-secondary"
      className="form-control input-sm border-secondary"
      value={CurrentDateValue()}
      readOnly
      disabled
    />
  );
};

export default CurrentDate;
