import { useRouter } from 'next/router';
import React from 'react';

const ReadyReceiptMasterTableHeader = () => {
  const { query } = useRouter();
  return (
    <thead>
      <tr>
        <th className="thead" scope="col">
          Sr.no
        </th>
        <th className="thead" scope="col">
          Product Code<span className="text-danger">*</span>
        </th>
        {(query?.receipt === 'kundan' || query?.receipt === 'Kundan') && (
          <th className="thead" scope="col">
            Kun Karigar
          </th>
        )}
        <th className="thead" scope="col">
          Net Wt<span className="text-danger">*</span>
        </th>
        {(query?.receipt === 'kundan' || query?.receipt === 'Kundan') && (
          <th className="thead" scope="col">
            Few Wt
          </th>
        )}
        <th className="thead" scope="col">
          Mat Wt
        </th>
        <th className="thead" scope="col">
          Gross Wt
        </th>
        {query?.receipt === 'mangalsutra' ||
        query?.receipt === 'Mangalsutra' ? (
          <th className="thead" scope="col">
            BB Pcs
          </th>
        ) : (
          <th className="thead" scope="col">
            Kun Pcs
          </th>
        )}
        <th className="thead" scope="col">
          Other
        </th>
        <th className="thead" scope="col">
          Total
        </th>
        <th className="thead" scope="col">
          Add Photo
        </th>
        <th className="thead" scope="col"></th>
        <th className="thead" scope="col"></th>
      </tr>
    </thead>
  );
};

export default ReadyReceiptMasterTableHeader;
