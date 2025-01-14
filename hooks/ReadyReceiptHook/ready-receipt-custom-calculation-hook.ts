import React, { useEffect, useState } from 'react';

const useReadyReceiptCustomCalculationHook = () => {
  const calculateWtForCreateReceipt: any = ({ tableData, indexVal }: any) => {
    return tableData?.map((row: any, i: any) => {
      if (row.idx === indexVal) {
        const customOther = parseFloat(row.custom_other);
        const totalAmount = parseFloat(row.totalAmount);

        if (!isNaN(customOther) && !isNaN(totalAmount)) {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: totalAmount + customOther,
          };
        } else if (!isNaN(customOther)) {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: customOther,
          };
        } else {
          return {
            ...row,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(row.custom_mat_wt),
            custom_total: totalAmount,
          };
        }
      }
      return row;
    });
  };

  const calculateReadyReceiptModalData: any = ({
    materialWeight,
    tableData,
    indexVal,
  }: any) => {
    const weightAddition: any = materialWeight.reduce((accu: any, val: any) => {
      let weight: any = val.weight;
      if (val.weight === '') {
        weight = 0;
      }
      const total = Number(accu) + Number(weight);
      return total;
    }, 0);

    const totalvalues: any = materialWeight.map(
      (row: any) =>
        row.pcs * row.piece_ + row.carat * row.carat_ + row.weight * row.gm_
    );

    let numbers: any;
    if (Array.isArray(totalvalues) && totalvalues.length === 1) {
      numbers = totalvalues[0];
    } else {
      numbers = totalvalues.reduce((accu: any, val: any) => {
        return accu + val;
      }, 0);
    }

    const totalAmmountValues: any = totalvalues.reduce(
      (accu: any, val: any) => {
        return accu + val;
      },
      0
    );

    const updatedMaterialWeight: any = tableData?.map((row: any, i: any) => {
      if (row.idx === indexVal) {
        const numbersParsed: any = Number(numbers);
        return {
          ...row,
          totalModalWeight: weightAddition,
          totalAmount: totalAmmountValues,
          table: materialWeight.map(({ id, ...rest }: any) => ({ ...rest })),
          custom_mat_wt: weightAddition,
          custom_gross_wt:
            Number(row.custom_net_wt) +
            Number(row.custom_few_wt) +
            Number(weightAddition),
          custom_total: numbersParsed,
        };
      }
      return row;
    });

    const updatedModalData: any = updatedMaterialWeight.map(
      (row: any, i: any) => {
        if (row.idx === indexVal) {
          return {
            ...row,
            table: row.table.map((tableItem: any, index: any) => ({
              ...tableItem,

              amount:
                (Number(tableItem.pcs) || 0) * (Number(tableItem.piece_) || 0) +
                (Number(tableItem.carat) || 0) *
                  (Number(tableItem.carat_) || 0) +
                (Number(tableItem.weight) || 0) * (Number(tableItem.gm_) || 0),
            })),
          };
        }
        return row;
      }
    );

    let updatedDataVal: any = updatedModalData.map((tableItem: any) => {
      let newTableItem = { ...tableItem };
      newTableItem.table = tableItem.table.filter((modalData: any) => {
        return Object.keys(modalData.material)?.length > 0;
      });
      return newTableItem;
    });

    return {
      updatedMaterialWeight,
      updatedDataVal,
    };
  };

  const calculateTableDataForAmendReceipt: any = ({
    tableData,
    indexVal,
  }: any) => {
    return tableData?.map((row: any, i: any) => {
      if (row.idx === indexVal) {
        if (row.custom_other !== '' && row.custom_total !== '') {
          return {
            ...row,
            custom_total: Number(row.totalAmount) + Number(row.custom_other),
          };
        } else if (row.custom_other !== '') {
          return {
            ...row,
            custom_total: Number(row.custom_other),
          };
        } else {
          return {
            ...row,
            custom_total: Number(row.totalAmount),
          };
        }
      }
      return row;
    });
  };

  const calculateTableDataForUpdateReceipt: any = ({
    filteredDataa,
    indexVal,
  }: any) => {
    return (
      filteredDataa?.length > 0 &&
      filteredDataa !== null &&
      filteredDataa?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          if (
            row.totalAmount !== undefined &&
            row.custom_other !== '' &&
            row.custom_total !== '' &&
            row.custom_other !== 0
          ) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.totalAmount) + Number(row.custom_other),
            };
          } else if (row.totalAmount === undefined && row.custom_other === 0) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.custom_total),
            };
          } else {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.custom_total),
            };
          }
        }
        return row;
      })
    );
  };

  const filteredTableDataForUpdate = (tableData: any) => {
    const filteredTableData = tableData.filter((row: any) => {
      const hasNoValues = Object.keys(row).every(
        (key) => key === 'idx' || key === 'table' || row[key] === ''
      );
      // Exclude objects where item_code has no values and custom_gross_wt is equal to 0
      const shouldExclude =
        row.product_code === '' && Number(row.custom_gross_wt) === 0;

      return !hasNoValues && !shouldExclude;
    });
    return filteredTableData;
  };
  return {
    calculateWtForCreateReceipt,
    calculateTableDataForUpdateReceipt,
    calculateTableDataForAmendReceipt,
    filteredTableDataForUpdate,
    calculateReadyReceiptModalData,
  };
};

export default useReadyReceiptCustomCalculationHook;
