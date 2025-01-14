import React from 'react';
import SearchSelectInputField from '../InputDropdown/SearchSelectInputField';

const ReportFilterListing: any = ({
  reportName,
  voucherNumber,
  setSearchItem,
  searchItem,
  selectDropDownReset,
  setSelectDropDownReset,
  searchVoucherNum,
  setSearchVoucherNum,
  itemList,
  HandleSearchInput,
  searchName,
  searchInputValues,
  name,
  HandleSerachReport,
}: any) => {
  return (
    <div className="d-flex justify-content-center ">
      {reportName === 'Item Status Report' && (
        <div className="col-sm-2 mx-1">
          <label className="text-grey">Item</label>
          <SearchSelectInputField
            karigarData={
              itemList?.length > 0 &&
              itemList !== null &&
              itemList.map((data: any) => ({
                karigar_name: data.name,
              }))
            }
            placeholder="Item"
            className="form-control input-fields custom-input-field line-height"
            style="max-width"
            selectedDropdownValue={searchItem}
            setSelectedDropdownValue={setSearchItem}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
      <div className="col-sm-2 p-0 mx-1">
        <label className="text-grey">From Date</label>
        <div>
          <input
            type="date"
            name="from_date"
            value={searchInputValues.from_date}
            className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10 "
            onChange={(e: any) =>
              HandleSearchInput(e.target.value, 'from_date')
            }
          />
        </div>
      </div>
      <div className="col-sm-2 p-0 mx-1">
        <label className="text-grey">To Date</label>
        <div>
          <input
            type="date"
            name="to_date"
            value={searchInputValues.to_date}
            className="form-control input-fields custom-input-field line-height bg-primary bg-opacity-10"
            onChange={(e: any) => HandleSearchInput(e.target.value, 'to_date')}
          />
        </div>
      </div>
      {reportName === 'Item Status Report' && (
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">Voucher Name</label>
          <SearchSelectInputField
            karigarData={voucherNumber}
            placeholder="Voucher Number"
            className="form-control input-fields custom-input-field line-height"
            style={'max-width'}
            selectedDropdownValue={searchVoucherNum}
            setSelectedDropdownValue={setSearchVoucherNum}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
      <div className="mt-4 mb-1 ms-2 d-flex justify-content-start">
        <button
          className="btn btn-primary m-0 p-1 px-2"
          onClick={HandleSerachReport}
        >
          <i className="fa-solid fa-magnifying-glass pe-2"></i>
          Search
        </button>
      </div>
    </div>
  );
};

export default ReportFilterListing;
