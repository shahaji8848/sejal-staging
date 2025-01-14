import CurrentDate from '@/components/CurrentDate';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { useRouter } from 'next/router';

const CustomerSalesTable1 = ({
  clientNameListData,
  handleSelectClientGroup,
  clientGroupList,
  readOnlyFields,
  setStateForDocStatus,
  defaultSalesDate,
  title,
  warehouseListData,
  barcodedata,
  setBarcodeData,
  handleBarcodeData,
  isBarcodeChecked,
  handleTable1InputChange,
  inputTable1Value
}: any) => {
  const { query } = useRouter();

  const clientData: any = {
    fieldname: 'custom_client_name',
    fieldtype: 'Link',
    link_data:
      clientNameListData?.length > 0
        ? Array.from(new Set(clientNameListData.map((data: any) => data?.client_name)))
        : [],
  };
  const locationData: any = {
    fieldname: 'location',
    fieldtype: 'Link',
    link_data:
      warehouseListData?.length > 0
        ? Array.from(new Set(warehouseListData.map((data: any) => data?.name)))
        : [],
  };

  return (
    <div className=" mt-2">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th className="thead " scope="col">
              {title}
            </th>
            <th className="thead" scope="col">
              Transaction Date
            </th>
            <th className="thead" scope="col">
              Client<span className='text-danger'>*</span>
            </th>
            <th className="thead" scope="col">
              Remarks
            </th>
            {query?.saleId === 'saleReturns' && (
              <th className="thead " scope="col">
                Sales Type
              </th>
            )}
            <th className="thead" scope="col">
              Location
            </th>
            {query?.saleId === 'customerSale' && (
              <th className="thead " scope="col">
                Barcode
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_row " scope="row">
              <input
                className=" form-control input-sm border border-secondary light-background"
                type="text"
                name="remarks"
                autoComplete="off"
                value={query?.deliveryNoteId}
                readOnly
              />
            </td>
            <td className="table_row">
              <CurrentDate defaultSalesDate={defaultSalesDate} />
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={clientData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.custom_client_name}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                readOnlyFields={readOnlyFields}
              />
              {/* <SearchSelectInputField
                karigarData={
                  clientNameListData?.length > 0 &&
                  clientNameListData !== null &&
                  clientNameListData.map((data: any) => ({
                    karigar_name: data.client_name,
                  }))
                }
                setSelectedDropdownValue={setSelectedClient}
                selectedDropdownValue={selectedClient}
                // defaultValue={
                //   DetailOfDeliveryNoteFromStore?.data?.custom_client_name
                // }
                placeholder={'Client Name'}
                className={'form-control input-sm border border-secondary'}
                clientGroupList={clientGroupList}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                handleSelectClientGroup={handleSelectClientGroup}
                selectDropDownReset={itemCodeDropdownReset}
                setSelectDropDownReset={setItemCodeDropdownReset}
              /> */}
            </td>

            <td className="table_row">
              <input
                className="form-control border border-secondary"
                style={{ lineHeight: "20px", padding: "0px" }}
                type="text"
                name="remarks"
                autoComplete="off"
                readOnly={readOnlyFields}
                value={inputTable1Value?.remarks}
                onChange={(e) => {
                  handleTable1InputChange(e.target.value, e.target.name);
                }}
              />
            </td>

            <td className="table_row">
              <AutoCompleteInput
                data={locationData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.store_location}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                readOnlyFields={readOnlyFields}
              />
              {/* <SearchSelectInputField
                karigarData={
                  warehouseListData?.length > 0 &&
                  warehouseListData !== null &&
                  warehouseListData.map((data: any) => ({
                    karigar_name: data.custom_store_location,
                  }))
                }
                recipitData={deliveryNoteData}
                setRecipitData={setDeliveryNoteData}
                setSelectedDropdownValue={setSelectedLocation}
                selectedDropdownValue={selectedLocation}
                defaultValue="Mumbai"
                className={'form-control input-sm border border-secondary'}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                name="store_location"
                selectDropDownReset={itemCodeDropdownReset}
                setSelectDropDownReset={setItemCodeDropdownReset}
              /> */}
            </td>
            {query?.saleId === 'customerSale' && (
              <td className="table_row">
                <input
                  type="checkbox"
                  className="m-0 mt-1"
                  onChange={handleBarcodeData}
                  checked={isBarcodeChecked}
                />
                <label className="ps-1">Yes</label>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSalesTable1;
