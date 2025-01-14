import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../styles/readyReceipts.module.css';
import SelectInputKunKarigar from '../../InputDropdown/SelectInputKunKarigar';
import PurchaseReceiptFileUploadMaster from './ReadyReceiptFileUpload/ReadyReceiptFileUploadMaster';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TotalReadOnlyRow from './TotalReadOnlyRow';
import ReadyReceiptMasterTableHeader from './ReadyReceiptMasterTableHeader';

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
  setSelectedKundanKarigarDropdownValue,
  kunKarigarDropdownReset,
  setKunKarigarDropdownReset,
  calculateEditTotal,
  handleClearFileUploadInput,
  handleCreate,
  handleUpdateReceipt,
  lastInputRef,
  firstInputRef,
  setMatWt,
  specificDataFromStore,
  handleAmendButtonForDuplicateChitti,
  tabDisabled
}: any) => {
  const { query } = useRouter();
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
                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-center`}
                      type="text"
                      defaultValue={item?.product_code}
                      value={item.product_code}
                      onChange={(e) =>
                        handleFieldChange(
                          item.idx,
                          'tableRow',
                          'product_code',
                          e.target.value
                        )
                      }
                      readOnly={readOnlyFields}
                    />
                  </td>
                  {(query?.receipt === 'kundan' ||
                    query?.receipt === 'Kundan') && (
                      <td className="table_row">
                        <SelectInputKunKarigar
                          kundanKarigarData={kundanKarigarData}
                          kunKarigarDropdownReset={kunKarigarDropdownReset}
                          setKunKarigarDropdownReset={setKunKarigarDropdownReset}
                          defaultValue={item.custom_kun_karigar}
                          tableData={tableData}
                          setTableData={setTableData}
                          setSelectedKundanKarigarDropdownValue={
                            setSelectedKundanKarigarDropdownValue
                          }
                          item={item}
                          id={item.idx}
                          setStateForDocStatus={setStateForDocStatus}
                          readOnlyFields={readOnlyFields}
                          fieldName={'custom_kun_karigar'}
                        />
                      </td>
                    )}

                  <td className="table_row">
                    <input
                      className={` ${styles.input_field} text-end`}
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
                  {(query?.receipt === 'kundan' ||
                    query?.receipt === 'Kundan') && (
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
                    )}
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
                  {query?.receipt === 'mangalsutra' ||
                    query?.receipt === 'Mangalsutra' ? (
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
                  ) : (
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
                  )}

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
                    {' '}
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

                  <td className="table_row">
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
                  </td>
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