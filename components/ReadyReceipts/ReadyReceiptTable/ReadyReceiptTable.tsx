import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_category_data } from '@/store/slices/Master/get-category-slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CurrentDate from '../../CurrentDate';

const ReadyReceiptTable = ({
  karigarData,
  setReadyReceiptType,
  defaultKarigarData,
  setStateForDocStatus,
  readOnlyFields,
  warehouseListData,
  inputTable1Value,
  handleTable1InputChange
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router?.asPath?.split('/');
  const lastPartOfURL = pathParts[pathParts?.length - 1];
  const categoryDataFromStore: any = useSelector(get_category_data)?.data;


  const karigarCodeData: any = {
    fieldname: 'karigar_name',
    fieldtype: 'Link',
    link_data:
      karigarData?.length > 0
        ? Array.from(new Set(karigarData.map((data: any) => data?.karigar_code)))
        : [],
  };
  const categoryData: any = {
    fieldname: 'category',
    fieldtype: 'Link',
    link_data:
      categoryDataFromStore?.length > 0
        ? Array.from(new Set(categoryDataFromStore.map((data: any) => data?.category)))
        : [],
  };

  const receiptData: any = ["Kundan", "Mangalsutra", "Plain"];

  const readyReceiptData: any = {
    fieldname: 'custom_ready_receipt_type',
    fieldtype: 'Link',
    link_data:
      receiptData?.length > 0
        ? Array.from(new Set(receiptData.map((data: any) => data)))
        : [],
  };

  const locationData: any = {
    fieldname: 'custom_warehouse',
    fieldtype: 'Link',
    link_data:
      warehouseListData?.length > 0
        ? Array.from(new Set(warehouseListData.map((data: any) => data?.name)))
        : [],
  };


  return (
    <div className="">
      <table className="table table-hover table-bordered mb-1">
        <thead>
          <tr>
            <th className="thead" scope="col">
              Receipt no.
            </th>
            <th className="thead" scope="col">
              Date
            </th>
            <th className="thead" scope="col">
              Karigar <span className="text-danger">*</span>
            </th>
            <th className="thead" scope="col">
              Category <span className="text-danger">*</span>
            </th>
            <th className="thead" scope="col">
              Remarks
            </th>
            <th className="thead" scope="col">
              Ready Receipt Type
            </th>
            <th className="thead" scope="col">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                value={query?.receiptId}
                readOnly
                autoComplete="off"
              />
            </td>
            <td scope="row" className="table_row">
              <CurrentDate defaultKarigarData={defaultKarigarData} />
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={karigarCodeData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.custom_warehouse}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                placeholder={"Select Karigar Code"}
                readOnlyFields={readOnlyFields}
              />
              {/* <SearchSelectInputField
                karigarData={updatedKarigarData}
                defaultValue={karigarData?.karigar_name}
                recipitData={recieptData}
                setRecipitData={setRecipitData}
                selectedDropdownValue={selectedDropdownValue}
                setSelectedDropdownValue={setSelectedDropdownValue}
                setStateForDocStatus={setStateForDocStatus}
                placeholder={'Karigar Code'}
                className={'form-control input-sm border border-secondary'}
                readOnlyFields={readOnlyFields}
                name="custom_karigar"
                setSelectDropDownReset={setKunKarigarDropdownReset}
              /> */}
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={categoryData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.category}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                placeholder={"Select Category"}
                readOnlyFields={readOnlyFields}
              />
            </td>

            <td className="table_row">
              <input
                className="form-control input-sm border border-secondary"
                type="text"
                name="remarks"
                readOnly={readOnlyFields}
                value={inputTable1Value?.remarks}
                onChange={(e) => {
                  handleTable1InputChange(e.target.value, e.target.name);
                }}
                placeholder='remarks'
                autoComplete="off"
              />
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={readyReceiptData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.custom_ready_receipt_type}
                placeholder={"Select Receipt Type"}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                readOnlyFields={readOnlyFields}
              />
              {/* <input
                className="form-control input-sm border border-secondary"
                type="text"
                readOnly
                value={
                  readyReceiptType ||
                  (defaultKarigarData !== undefined &&
                    defaultKarigarData?.length > 0 &&
                    defaultKarigarData !== null
                    ? defaultKarigarData[0]?.custom_ready_receipt_type
                    : '')
                }
                disabled
              /> */}
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={locationData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.custom_warehouse}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                placeholder={"Select Location"}
                readOnlyFields={readOnlyFields}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReadyReceiptTable;
