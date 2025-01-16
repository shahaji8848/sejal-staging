import { get_sub_category_data } from '@/store/slices/Master/get-sub-category-slice';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/readyReceipts.module.css';
import ReadyReceiptMasterTableHeader from './ReadyReceiptMasterTableHeader';
import TotalReadOnlyRow from './TotalReadOnlyRow';
import AutoCompleteInput from '@/components/InputDropdown/AutoCompleteInput';
import { get_category_data } from '@/store/slices/Master/get-category-slice';

const ReadyReceiptMasterTable = ({
  handleFieldChange,
  tableData,
  handleDeleteRow,
  handleTabPress,
  setTableData,
  kundanKarigarData,
  handleModal,
  readOnlyFields,
  setStateForDocStatus,
  calculateEditTotal,
  handleClearFileUploadInput,
  handleCreate,
  handleUpdateReceipt,
  lastInputRef,
  firstInputRef,
  setMatWt,
  specificDataFromStore,
  handleAmendButtonForDuplicateChitti,
  tabDisabled,
  inputTable1Value
}: any) => {
  const { query } = useRouter();
  // Access data from the store
  const subCategoryDataFromStore: any = useSelector(get_sub_category_data)?.data;

  const getProductcode: any = subCategoryDataFromStore?.length > 0 &&
    subCategoryDataFromStore.filter((categoryData: any) =>
      tableData?.length > 0 &&
      tableData?.some((data: any) => categoryData?.code === data.product_code)
    );
  const productCounter: any = getProductcode.length > 0
    ? getProductcode.map((data: any) => ({ code: data?.code, counter: data?.counter }))
    : [];

  const productCounterValue = productCounter?.length > 0 && productCounter.map((data: any) => data?.code + "-" + Number(Number(data?.counter) + 1)).join(", ");

  const [calculationRow, setCalculationRow] = useState({
    custom_net_wt: 0,
    custom_few_wt: 0,
    custom_mat_wt: 0,
    custom_gross_wt: 0,
    custom_pcs: 0,
    custom_other: 0,
    custom_total: 0,
  });


  useEffect(() => {
    const calculateLiveCalculations = async () => {
      // Calculate live values based on tableData
      const liveCalculations = tableData?.reduce(
        (accumulator: any, row: any) => {
          accumulator.custom_net_wt += Number(row.custom_net_wt) || 0;
          accumulator.custom_few_wt += Number(row.custom_few_wt) || 0;
          accumulator.custom_mat_wt += Number(row.custom_mat_wt) || 0;
          accumulator.custom_gross_wt += Number(row.custom_gross_wt) || 0;
          accumulator.custom_pcs += Number(row.table[0].pcs) || 0;
          accumulator.custom_other += Number(row.custom_other) || 0;
          accumulator.custom_total += Number(row.custom_total) || 0;
          return accumulator;
        },
        {
          custom_net_wt: 0,
          custom_few_wt: 0,
          custom_mat_wt: 0,
          custom_gross_wt: 0,
          custom_pcs: 0,
          custom_other: 0,
          custom_total: 0,
        }
      );

      // Calculate total custom amount for custom_ot_amt

      const totalCustomOtAmount = tableData.reduce((total: any, item: any) => {
        const customTotal = parseFloat(item.custom_total) || 0;
        const customOther = parseFloat(item.custom_other) || 0;

        if (customTotal !== item.totalAmount) {
          return total + customTotal;
        } else {
          return total + customTotal + customOther;
        }
      }, 0);
      liveCalculations.custom_total = totalCustomOtAmount;

      // Update the calculation row state
      setCalculationRow(liveCalculations);
    };
    // Recalculate live calculations whenever tableData changes
    calculateLiveCalculations();
  }, [tableData, setTableData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (specificDataFromStore?.data[0]?.items?.length !== tableData?.length) {
        firstInputRef?.current?.focus();
      } else {
        lastInputRef?.current?.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [specificDataFromStore, firstInputRef, lastInputRef, tableData?.length]);

  const productData: any = subCategoryDataFromStore?.length > 0
    ? subCategoryDataFromStore.filter((categoryData: any) =>
      inputTable1Value?.category
        ? categoryData.category === inputTable1Value?.category
        : true
    )
    : [];

  const productCodeData: any = {
    fieldname: 'product_code',
    fieldtype: 'Link',
    link_data:
      productData?.length > 0
        ? Array.from(new Set(productData.map((data: any) => data?.code)))
        : [],
  };
  return (
    <div className="table responsive">
      <table className="table table-hover table-bordered">
        <ReadyReceiptMasterTableHeader />
        <tbody>
          {tableData?.length > 0 &&
            tableData.map((item: any, i: any) => (
              <>
                <tr key={item.idx} className={`${styles.table_row}`}>
                  <td className="table_row">{item.idx}</td>
                  <td className="table_row" >
                    <AutoCompleteInput
                      data={productCodeData}
                      handleSearchInput={(value: any, fieldName: any) =>
                        handleFieldChange(item.idx, 'tableRow', fieldName, value)
                      }
                      value={item?.product_code}
                      styleCss={{
                        padding: "0px",
                        marginTop: '1px',
                        border: "1px solid #6c757d",
                        fontSize: "10px",
                        borderRadius: "0px",
                        textAlign: "center"
                      }}
                      // placeholder={"Select Code"}
                      readOnlyFields={readOnlyFields}
                    />
                  </td>
                  <td className="table_row text-center">
                    <input
                      className={`${styles.input_field} text-center`}
                      type="text"
                      value={productCounterValue || ""}
                      readOnly
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={`${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      value={parseFloat(item.custom_net_wt)}
                      defaultValue={
                        item.custom_net_wt && item?.custom_net_wt?.toFixed(3)
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_net_wt',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      value={item.custom_few_wt}
                      defaultValue={
                        item.custom_few_wt && item.custom_few_wt?.toFixed(3)
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_few_wt',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      // value={
                      //   // Number(tableData[i]?.totalModalWeight) ||
                      //   item.custom_mat_wt
                      // }
                      value={item?.custom_mat_wt}
                      defaultValue={
                        item.custom_mat_wt && item.custom_mat_wt?.toFixed(3)
                      }
                      readOnly={readOnlyFields}
                      onChange={(e) => {
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_mat_wt',
                          e.target.value
                        );
                        setMatWt((prevState: any) => ({
                          ...prevState,
                          tableMatWt: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) => handleModal(e, item.idx, item)}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      // value={calculateGrossWt(i)?.toFixed(3)}
                      value={
                        item.custom_gross_wt && item.custom_gross_wt?.toFixed(3)
                      }
                    />
                  </td>

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      // value={item.custom_pcs}
                      defaultValue={item?.table[0]?.pcs}
                      value={item?.table[0]?.pcs}
                      onChange={(e) => {
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'custom_pcs',
                          e.target.value
                        );
                      }}
                      readOnly={readOnlyFields}
                    />
                  </td>

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      value={Number(item.custom_other)}
                      defaultValue={Number(item.custom_other)}
                      onChange={(e) => {
                        calculateEditTotal(item.idx, e.target.value);
                      }}
                      readOnly={readOnlyFields}
                    />
                  </td>
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
                      type="number"
                      min={0}
                      readOnly
                      disabled
                      name={`sum-${i + 1}`}
                      // defaultValue={tableData[i]?.custom_total}
                      value={parseFloat(
                        Number(tableData[i].totalAmount) >= 0
                          ? Number(tableData[i]?.custom_other) +
                          Number(tableData[i]?.totalAmount)
                          : tableData[i]?.custom_total !== '' &&
                            tableData[i]?.custom_total !== undefined
                            ? tableData[i]?.custom_total
                            : tableData[i]?.custom_other
                      )?.toFixed(2)}
                    />
                  </td>

                  {/* <td className="table_row">
                    <PurchaseReceiptFileUploadMaster
                      handleFieldChange={handleFieldChange}
                      item={item}
                      readOnlyFields={readOnlyFields}
                      handleClearFileUploadInput={handleClearFileUploadInput}
                      handleUpdateReceipt={handleUpdateReceipt}
                      handleCreate={handleCreate}
                      handleAmendButtonForDuplicateChitti={handleAmendButtonForDuplicateChitti}
                      tabDisabled={tabDisabled}
                    />
                  </td> */}
                  <td className="table_row d-flex justify-content-center">
                    <button
                      className="d-flex align-items-center delete-link p-1 border-0"
                      disabled={readOnlyFields}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td className="table_row">
                    <button
                      className="form-control d-flex justify-content-center align-items-center delete-link p-1 border-0"
                      onClick={() => handleDeleteRow(item.idx)}
                      onKeyDown={(e) => handleTabPress(e, item.idx)}
                      disabled={readOnlyFields}
                      ref={lastInputRef}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: 'red', fontSize: 15 }}
                      />
                    </button>
                  </td>
                </tr>
              </>
            ))}
          <TotalReadOnlyRow calculationRow={calculationRow} />
        </tbody>
      </table>
    </div>
  );
};

export default ReadyReceiptMasterTable;