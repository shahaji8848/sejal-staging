import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_category_data } from '@/store/slices/Master/get-category-slice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CurrentDate from '../../CurrentDate';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getReadyReceiptTypeData from '@/services/api/PurchaseReceipt/get-ready-receipt-type-api';

const ReadyReceiptTable = ({
  karigarData,
  setReadyReceiptType,
  defaultKarigarData,
  setStateForDocStatus,
  readOnlyFields,
  warehouseListData,
  inputTable1Value,
  handleTable1InputChange,
}: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router?.asPath?.split('/');
  const lastPartOfURL = pathParts[pathParts?.length - 1];

  const categoryDataFromStore: any = useSelector(get_category_data)?.data;
  const loginAcessToken = useSelector(get_access_token);
  const [readyReceiptTypeData, setReadyReceiptTypeData] = useState([])

  const getReadyReceiptTypeDataFromApi: any = async () => {
    let readyReceiptDataFromApi: any = await getReadyReceiptTypeData(loginAcessToken?.token)
    if (readyReceiptDataFromApi?.data?.message?.status === "success") {
      setReadyReceiptTypeData(readyReceiptDataFromApi?.data?.message?.data)
    } else {
      setReadyReceiptTypeData([])
    }
  }
  useEffect(() => {
    getReadyReceiptTypeDataFromApi()
  }, [])

  const karigarCodeData: any = {
    fieldname: 'custom_karigar',
    fieldtype: 'Link',
    link_data:
      karigarData?.length > 0
        ? Array.from(new Set(karigarData.map((data: any) => data?.karigar_code)))
        : [],
  };
  const categoryData: any = {
    fieldname: 'custom_category',
    fieldtype: 'Link',
    link_data:
      categoryDataFromStore?.length > 0
        ? Array.from(new Set(categoryDataFromStore.map((data: any) => data?.category)))
        : [],
  };

  const readyReceiptTypeDataFromDropdown: any = {
    fieldname: 'custom_ready_receipt_type',
    fieldtype: 'Link',
    link_data:
      readyReceiptTypeData?.length > 0
        ? Array.from(new Set(readyReceiptTypeData.map((data: any) => data.name)))
        : [],
  };

  const locationData: any = {
    fieldname: 'set_warehouse',
    fieldtype: 'Link',
    link_data:
      warehouseListData?.length > 0
        ? Array.from(new Set(warehouseListData.map((data: any) => data?.location)))
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
              {query?.receipt === "return" ? "Return" : "Ready"}  Receipt Type
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
                value={inputTable1Value?.custom_karigar}
                styleCss={{
                  padding: "0px",
                  border: "1px solid #6c757d",
                  lineHeight: "20px",
                  textAlign: "center"
                }}
                placeholder={"Select Karigar Code"}
                readOnlyFields={readOnlyFields}
              />
            </td>
            <td className="table_row">
              <AutoCompleteInput
                data={categoryData}
                handleSearchInput={(value: any, fieldName: any) =>
                  handleTable1InputChange(value, fieldName)
                }
                value={inputTable1Value?.custom_category}
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
                data={readyReceiptTypeDataFromDropdown}
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
                value={inputTable1Value?.set_warehouse}
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
