import { Button, Modal } from 'react-bootstrap';
import SearchSelectInputField from '../InputDropdown/SearchSelectInputField';
import { useRouter } from 'next/router';
import { get_kun_category_data } from '@/store/slices/Master/get-kun-category-slice';
import { get_bb_category_data } from '@/store/slices/Master/get-bb-category-slice';
import { get_cs_category_data } from '@/store/slices/Master/get-cs-category-slice';
import { get_ot_category_data } from '@/store/slices/Master/get-ot-category-slice';
import { useSelector } from 'react-redux';
import { get_sales_group_data } from '@/store/slices/Master/get-sales-group-slice';

const AddRecordModal = ({
  showAddRecord,
  handleCloseAddRecord,
  inputValue,
  HandleInputValue,
  handleUpdate,
  nameValue,
  HandleNameChange,
  error1,
  error2,
  error3,
  placeholder1,
  placeholder2,
  placeholder3,
  DropdownList,
  selectDropDownReset,
  setSelectDropDownReset,
  value,
  searchClient,
  setSearchClient,
  isMultiple,
  salesGroup,
  setSalesGroup,
}: any) => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];



  let kunCategory = useSelector(get_kun_category_data)?.data;
  let bbCategory = useSelector(get_bb_category_data)?.data;
  let csCategory = useSelector(get_cs_category_data)?.data;
  let otCategory = useSelector(get_ot_category_data)?.data;

  let salesGroupListData = useSelector(get_sales_group_data).data;
  const salesGroupData: any =
    salesGroupListData?.length > 0
      ? Array.from(
        new Set(salesGroupListData.map((data: any) => data.sales_group))
      ).map((sales_group: any) => ({ karigar_name: sales_group }))
      : [];
  return (
    <>
      <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
        <Modal.Header closeButton>
          <Modal.Title>Update {placeholder1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isMultiple ? (
            <>
              <div className=" m-1">
                <label>{placeholder1}</label>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  className="form-control w-50 border p-1 h-50"
                  value={inputValue?.name}
                  name='name'
                  onChange={(e) => {
                    HandleInputValue(e);
                  }}
                  required
                />
              </div>
              <div>{error1 && <p className="text-danger">{error1}</p>}</div>

              {
                (key === "karigar" || key === "kundanKarigar") && (
                  <>
                    <div className=" m-1">
                      <label>Karigar Code</label>
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        className="form-control w-50 border p-1 h-50"
                        value={inputValue?.karigar_code}
                        name='karigar_code'
                        onChange={(e) => {
                          HandleInputValue(e);
                        }}
                        required
                      />
                    </div>
                    <div>{error1 && <p className="text-danger">{error1}</p>}</div>

                  </>)}
            </>
          ) : (
            <>
              <div className="m-1">
                <label htmlFor="">{placeholder1}</label>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  className="form-control w-50 border p-0 px-2"
                  name="material"
                  value={nameValue?.material}
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
              </div>
              <div className="col-lg-6">
                {value === 'client' ? (
                  <>
                    <SearchSelectInputField
                      karigarData={DropdownList}
                      className={'form-control  border p-0 px-2'}
                      placeholder={placeholder2}
                      selectedDropdownValue={searchClient}
                      setSelectedDropdownValue={setSearchClient}
                      selectDropDownReset={selectDropDownReset}
                      setSelectDropDownReset={setSelectDropDownReset}
                    />


                    <label htmlFor="" className='mt-2'>Sales Group</label>
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

                    <label htmlFor="" className='mt-2'>Kun Category</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      id="kundan_category"
                      name="kundan_category"
                      onChange={(e) => {
                        HandleNameChange(e);
                      }}
                      value={nameValue.kundan_category}
                    >
                      <option selected>Select Kun Category</option>
                      {kunCategory?.length > 0 &&
                        kunCategory.map((category: any, index: any) => (
                          <option value={category.name1} key={index}>
                            {category.name1}
                          </option>
                        ))}
                    </select>

                    <label htmlFor="" className="mt-2">
                      CS Category
                    </label>
                    <select
                      className="form-select form-select-sm "
                      aria-label=".form-select-sm example"
                      id="cs_category"
                      name="cs_category"
                      onChange={(e) => {
                        HandleNameChange(e);
                      }}
                      value={nameValue.cs_category}

                    >
                      <option selected>Select CS Category</option>
                      {csCategory?.length > 0 &&
                        csCategory.map((category: any, index: any) => (
                          <option value={category.name1} key={index}>
                            {category.name1}
                          </option>
                        ))}
                    </select>

                    <label htmlFor="" className='mt-2'>OT Category</label>
                    <select
                      className="form-select form-select-sm "
                      aria-label=".form-select-sm example"
                      id="ot_category"
                      name="ot_category"
                      onChange={(e) => {
                        HandleNameChange(e);
                      }}
                      value={nameValue.ot_category}

                    >
                      <option selected>Select OT Category</option>
                      {otCategory?.length > 0 &&
                        otCategory.map((category: any, index: any) => (
                          <option value={category.name1} key={index}>
                            {category.name1}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="" className="mt-3">
                      BB Category
                    </label>
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      id="bb_category"
                      name="bb_category"
                      onChange={(e) => {
                        HandleNameChange(e);
                      }}
                      value={nameValue.bb_category}
                    >
                      <option selected>Select BB Category</option>
                      {bbCategory?.length > 0 &&
                        bbCategory.map((category: any, index: any) => (
                          <option value={category.name1} key={index}>
                            {category.name1}
                          </option>
                        ))}
                    </select>
                  </>
                ) : (
                  <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="material_abbr"
                    value={nameValue?.material_abbr || nameValue?.type}
                    onChange={(e) => {
                      HandleNameChange(e);
                    }}
                    required
                    autoComplete="off"
                  />
                )}
              </div>
              <div> {error2 && <p className="text-danger">{error2}</p>}</div>


              {(value === 'material' || value === 'subCategory') && (
                <>
                  <div className=" m-1">
                    <label htmlFor="">{placeholder3}</label>
                  </div>
                  <div className="col-lg-6">
                    <SearchSelectInputField
                      karigarData={DropdownList}
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
            </>
          )}
          {value === 'material' && (
            <>
              <div className=" m-1">
                <label htmlFor="">Category</label>
              </div>
              <input
                type="text"
                className="form-control border p-0 px-2 w-50"
                name="category"
                value={nameValue?.category}
                onChange={(e) => {
                  HandleNameChange(e);
                }}
                required
                autoComplete="off"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddRecord}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRecordModal;
