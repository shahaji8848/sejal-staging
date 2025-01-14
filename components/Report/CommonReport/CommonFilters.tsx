import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';

const CommonFilters = ({
  searchInputValues,
  handleSearchInput,
  handleSearchBtn,
  clientNameData,
  karigarNameData,
  itemListData,
  categoryData,
}: any) => {
  const { query } = useRouter();
  const [currentSubcategory, setCurrentSubcategory] = useState<any>([]);

  const categoryListData: any = {
    fieldname: 'category',
    fieldtype: 'Link',
    link_data:
      categoryData?.length > 0
        ? Array.from(new Set(categoryData.map((data: any) => data.category)))
        : [],
  };
  const subCategoryListData: any = {
    fieldname: 'sub_category',
    fieldtype: 'Link',
    link_data:
      currentSubcategory?.length > 0
        ? Array.from(
            new Set(currentSubcategory.map((data: any) => data.sub_category))
          )
        : categoryData?.length > 0
        ? Array.from(
            new Set(categoryData.map((data: any) => data.sub_category))
          )
        : [],
  };
  const clientNameList: any = {
    fieldname: 'client_name',
    fieldtype: 'Link',
    link_data:
      clientNameData?.length > 0
        ? Array.from(
            new Set(clientNameData.map((data: any) => data.client_name))
          )
        : [],
  };
  const karigarNameListData: any = {
    fieldname: 'karigar',
    fieldtype: 'Link',
    link_data:
      karigarNameData?.length > 0
        ? Array.from(
            new Set(karigarNameData.map((data: any) => data.karigar_name))
          )
        : [],
  };
  const productCodeData: any = {
    fieldname: 'product_code',
    fieldtype: 'Link',
    link_data:
      itemListData?.length > 0
        ? Array.from(new Set(itemListData.map((data: any) => data)))
        : [],
  };

  const handleSelectedCategory: any = (value: any, fieldName: any) => {
    const updatedSubCategory: any =
      categoryData?.length > 0 &&
      categoryData.filter((values: any) => values.category === value);
    setCurrentSubcategory(updatedSubCategory);
  };
  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-center flex-wrap">
        {query?.reportId !== 'product-code' &&
          query?.reportId !== 'detailed-summary-report' && (
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">From Date</label>
              <input
                type="date"
                name="from_date"
                value={searchInputValues.from_date}
                className="form-control bg-primary bg-opacity-10 "
                onChange={(e: any) =>
                  handleSearchInput(e.target.value, 'from_date')
                }
              />
            </div>
          )}
        {query?.reportId !== 'product-code' &&
          query?.reportId !== 'detailed-summary-report' && (
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">To Date</label>
              <input
                type="date"
                name="to_date"
                value={searchInputValues.to_date}
                className="form-control bg-primary bg-opacity-10"
                onChange={(e: any) =>
                  handleSearchInput(e.target.value, 'to_date')
                }
              />
            </div>
          )}
        {(query?.reportId === 'product-code' ||
          query?.reportId === 'detailed-summary-report') && (
          <>
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">Product Code</label>
              <AutoCompleteInput
                data={productCodeData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleSearchInput(value, fieldName)
                }
                value={searchInputValues?.product_code}
              />
            </div>
          </>
        )}
        {(query?.reportId === 'summary-report' ||
          query?.reportId === 'product-code' ||
          query?.reportId === 'ready-stock-summary-report' ||
          query?.reportId === 'detailed-summary-report') && (
          <>
            <div className="col-sm-2 p-0 mx-1">
              <label className="text-grey">Category</label>
              <AutoCompleteInput
                data={categoryListData}
                handleSearchInput={(value: any, fieldName: any) => {
                  handleSearchInput(value, fieldName);
                  handleSelectedCategory(value, fieldName);
                }}
                value={searchInputValues?.category}
              />
            </div>
          </>
        )}
        {(query?.reportId === 'ready-stock-summary-report' ||
          query?.reportId === 'summary-report' ||
          query?.reportId === 'detailed-summary-report') && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Sub Category</label>
            <AutoCompleteInput
              data={subCategoryListData}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.sub_category}
            />
          </div>
        )}

        {(query?.reportId === 'customer-wise-report' ||
          query?.reportId === 'product-code') && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Client Name</label>
            <AutoCompleteInput
              data={clientNameList}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.client_name}
            />
          </div>
        )}
        {(query?.reportId === 'karigar-wise-report' ||
          query?.reportId === 'product-code') && (
          <div className="col-sm-2 p-0 mx-1">
            <label className="text-grey">Karigar Name</label>
            <AutoCompleteInput
              data={karigarNameListData}
              handleSearchInput={(value: any, fieldName: any) =>
                handleSearchInput(value, fieldName)
              }
              value={searchInputValues?.karigar}
            />
          </div>
        )}

        {query?.reportId === 'product-code' && (
          <>
            <div className="col-sm-1 p-0 mx-1">
              <label className="text-grey">Gross Wt</label>
              <input
                type="number"
                name="gross_wt"
                value={searchInputValues.gross_wt}
                className="form-control bg-primary bg-opacity-10"
                onChange={(e: any) =>
                  handleSearchInput(e.target.value, 'gross_wt')
                }
              />
            </div>
            <div className="col-sm-1 p-0 mx-1">
              <label className="text-grey">Net Wt</label>
              <input
                type="number"
                name="net_wt"
                value={searchInputValues.net_wt}
                className="form-control bg-primary bg-opacity-10"
                onChange={(e: any) =>
                  handleSearchInput(e.target.value, 'net_wt')
                }
              />
            </div>
          </>
        )}

        <div className="mt-4 mb-1 ms-2 d-flex justify-content-start">
          <button
            className="btn btn-primary m-0 p-1 px-2"
            onClick={handleSearchBtn}
          >
            <i className="fa-solid fa-magnifying-glass pe-2"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonFilters;
