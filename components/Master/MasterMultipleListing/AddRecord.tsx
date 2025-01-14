import React from 'react';
import SearchSelectInputField from '@/components/InputDropdown/SearchSelectInputField';
import CategorySelection from '../Client/CategorySelection';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { useSelector } from 'react-redux';
import { get_sales_group_data } from '@/store/slices/Master/get-sales-group-slice';

const AddMaterial = ({
  nameValue,
  HandleNameChange,
  HandleSave,
  error1,
  error2,
  placeholder1,
  placeholder2,
  placeholder3,
  searchClient,
  setSearchClient,
  salesGroup,
  setSalesGroup,
  value,
  clientGroup,
  selectDropDownReset,
  setSelectDropDownReset,
}: any) => {
  let salesGroupListData = useSelector(get_sales_group_data).data;

  const salesGroupData: any =
    salesGroupListData?.length > 0
      ? Array.from(
        new Set(salesGroupListData.map((data: any) => data.sales_group))
      ).map((sales_group: any) => ({ karigar_name: sales_group }))
      : [];

  return (
    <div
      className="tab-pane fade w-75"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 ">
            <div className="m-1">
              <label htmlFor="">{placeholder1}</label>
              <span className="text-danger">*</span>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control border p-0"
                name="material"
                value={nameValue.material}
                onChange={(e) => {
                  HandleNameChange(e);
                }}
                required
                autoComplete="off"
              />
            </div>

            <div> {error1 && <p className="text-danger">{error1}</p>}</div>
            <div className=" m-1">
              <label htmlFor="">{placeholder2}</label>
              <span className="text-danger">*</span>
            </div>

            <div className="col-lg-6 w-100">
              {value === 'client' ? (
                <SearchSelectInputField
                  karigarData={clientGroup}
                  className={'form-control border p-0 px-2'}
                  placeholder={placeholder2}
                  selectedDropdownValue={searchClient}
                  setSelectedDropdownValue={setSearchClient}
                  selectDropDownReset={selectDropDownReset}
                  setSelectDropDownReset={setSelectDropDownReset}
                />
              ) : (
                <input
                  type="text"
                  className="form-control border p-0 px-2"
                  name="material_abbr"
                  value={nameValue.material_abbr}
                  onChange={(e) => {
                    HandleNameChange(e);
                  }}
                  required
                  autoComplete="off"
                />
              )}
            </div>
            {value === 'client' && (
              <>
                <div className="col-lg-6 w-100 h-25 mt-1">
                  <label htmlFor="">Sales Group</label>
                  <span className="text-danger">*</span>
                  <SearchSelectInputField
                    karigarData={salesGroupData}
                    className={'form-control border p-0 px-2'}
                    placeholder={"Sales Group"}
                    selectedDropdownValue={salesGroup}
                    setSelectedDropdownValue={setSalesGroup}
                    selectDropDownReset={selectDropDownReset}
                    setSelectDropDownReset={setSelectDropDownReset}

                  />
                </div>
              </>
            )}
          </div>
          {value === 'client' && (
            <CategorySelection handleNameChange={HandleNameChange} />
          )}
        </div>
        <div> {error2 && <p className="text-danger">{error2}</p>}</div>
        {(value === 'material' || value === 'subCategory') && (
          <>
            <div className=" m-1">
              <label htmlFor="">{placeholder3}</label>
              <span className="text-danger">*</span>
            </div>
            <div className="col-lg-6">
              <SearchSelectInputField
                karigarData={clientGroup}
                className={'form-control border p-0 px-2'}
                placeholder={placeholder3}
                selectedDropdownValue={searchClient}
                setSelectedDropdownValue={setSearchClient}
                selectDropDownReset={selectDropDownReset}
                setSelectDropDownReset={setSelectDropDownReset}
              />
            </div>

            {/* <div> {error3 && <p className="text-danger">{error3}</p>}</div> */}
          </>
        )}


        <div className="d-flex justify-content-start">
          <button
            type="submit"
            className=" btn btn-outline-primary py-1 mt-2 form-submit-button"
            onClick={HandleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMaterial;
