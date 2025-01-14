import getClientDetailsApi from '@/services/api/Sales/get-client-details-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useCustomCustomerSalesHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const SalesTableInitialState: any = {
    idx: 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
    item_code: '',
    custom_gross_wt: 0,
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: '',
    custom_cs_amt: 0,
    custom_kun_pc: '',
    custom_kun: '',
    custom_kun_amt: 0,
    custom_ot_: '',
    custom_ot_amt: 0,
    custom_other: '',
    custom_amount: 0,
    custom_warehouse: 'Mumbai',
  };
  const [kunCsOtFixedAmt, setKunCsOtFixedAmt] = useState({
    csFixedAmt: 0,
    kunFixedAmt: 0,
    otFixedAmt: 0,
  });
  const [stateForDocStatus, setStateForDocStatus] = useState<boolean>(false);
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: {},
    CsCategory: {},
    BbCategory: {},
    OtCategory: {},
  });

  const [selectedItemCodeForCustomerSale, setSelectedItemCodeForCustomerSale] =
    useState<any>({ id: '', item_code: '' });
  const [clientDetails, setClientDetails] = useState<any>({})
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [salesTableData, setSalesTableData] = useState<any>([
    SalesTableInitialState,
  ]);
  const [itemCodeDetails, setItemCodeDetails] = useState<any>([]);
  const [itemCodeDropdownReset, setItemCodeDropdownReset] =
    useState<boolean>(false);

  const newRowDataForSalesTable: any = {
    idx: salesTableData?.length + 1,
    custom_pr_bb_wt: '',
    custom_pr_cs_wt: '',
    custom_pr_kun_wt: '',
    custom_pr_other_wt: '',
    item_code: '',
    custom_gross_wt: 0,
    custom_kun_wt: '',
    custom_cs_wt: '',
    custom_bb_wt: '',
    custom_other_wt: '',
    custom_net_wt: '',
    custom_cs: Number(kunCsOtFixedAmt?.csFixedAmt),
    custom_cs_amt: 0,
    custom_kun_pc: '',
    custom_kun: Number(kunCsOtFixedAmt?.kunFixedAmt),
    custom_kun_amt: 0,
    custom_ot_: Number(kunCsOtFixedAmt?.otFixedAmt),
    custom_ot_amt: 0,
    custom_other: '',
    custom_amount: 0,
    custom_warehouse: 'Mumbai',
  };

  const handleAddRowForSales: any = () => {
    setSalesTableData([...salesTableData, newRowDataForSalesTable]);
    setStateForDocStatus(true);
  };

  const handleEmptyDeliveryNote = () => {
    setSeletedCategory({
      KunCategory: {},
      CsCategory: {},
      BbCategory: {},
      OtCategory: {},
    });
    setKunCsOtFixedAmt({
      csFixedAmt: 0,
      kunFixedAmt: 0,
      otFixedAmt: 0,
    });
    setSelectedClient('');
    setSalesTableData([SalesTableInitialState]);
    setSelectedItemCodeForCustomerSale({ id: '', item_code: '' });
    setStateForDocStatus(true);
    setItemCodeDropdownReset(true);
  };

  const getClientDetails: any = async () => {
    let getClientDetails: any = await getClientDetailsApi(loginAcessToken?.token, selectedClient);
    if (getClientDetails?.data?.message?.status === "success") {
      let categoryData: any = getClientDetails?.data?.message?.data;
      const selectedCategories = {
        KunCategory: { name1: categoryData?.kundan_category?.name, type: categoryData?.kundan_category?.type },
        CsCategory: { name1: categoryData?.cs_category?.name, type: categoryData?.cs_category?.type },
        OtCategory: { name1: categoryData?.ot_category?.name, type: categoryData?.ot_category?.type },
        BbCategory: { name1: categoryData?.bb_category?.name, type: categoryData?.bb_category?.type },
      };

      setClientDetails({
        tableData: {
          idx: salesTableData?.length + 1,
          custom_pr_bb_wt: '',
          custom_pr_cs_wt: '',
          custom_pr_kun_wt: '',
          custom_pr_other_wt: '',
          item_code: '',
          custom_kun_wt: selectedCategories?.KunCategory?.type,
          custom_cs_wt: selectedCategories?.CsCategory?.type,
          custom_bb_wt: selectedCategories?.BbCategory?.type,
          custom_other_wt: selectedCategories?.OtCategory?.type,
          custom_net_wt: '',
          custom_cs: Number(kunCsOtFixedAmt?.csFixedAmt),
          custom_cs_amt: 0,
          custom_kun_pc: '',
          custom_kun: Number(kunCsOtFixedAmt?.kunFixedAmt),
          custom_kun_amt: 0,
          custom_ot_: Number(kunCsOtFixedAmt?.otFixedAmt),
          custom_ot_amt: 0,
          custom_other: '',
          custom_amount: 0,
          warehouse: '',
        },
        material_data: categoryData?.materials
      });
      setSeletedCategory(selectedCategories);

      // Update sales table data using the utility function
      setSalesTableData((prevSalesTableData: any) => {
        return prevSalesTableData.map((row: any) =>
          calculateRow(row, selectedCategories, kunCsOtFixedAmt)
        );
      });

      // Set document status
      setStateForDocStatus(true);
    }
  };

  useEffect(() => {
    getClientDetails()
  }, [selectedClient])




  // Update a row with calculated values
  const calculateRow = (row: any, selectedCategories: any, kunCsOtFixedAmt: any): any => {
    const { kunAmt, kunUnit } = calculateKundanAmounts(clientDetails, row);
    const itemDetails = itemCodeDetails?.find(
      (item: any) => item?.item_code === row.item_code
    );

    const updatedRow = {
      ...row,
      custom_kun: roundToThreeDecimal(kunUnit), // Kundan unit
      custom_kun_amt: roundToThreeDecimal(kunAmt), // Kundan amount
      custom_kun_wt:
        row?.custom_kun_wt > 0
          ? itemDetails?.custom_kun_wt * selectedCategories?.KunCategory?.type / 100
          : Number(selectedCategories?.KunCategory?.type),
      custom_cs_wt:
        row?.custom_cs_wt > 0
          ? itemDetails?.custom_cs_wt * Number(selectedCategories?.CsCategory?.type) / 100
          : Number(selectedCategories?.CsCategory?.type),
      custom_bb_wt:
        row?.custom_bb_wt > 0
          ? itemDetails?.custom_bb_wt - Number(selectedCategories?.BbCategory?.type)
          : Number(selectedCategories?.BbCategory?.type),
      custom_other_wt:
        row?.custom_other_wt > 0
          ? itemDetails?.custom_other_wt * Number(selectedCategories?.OtCategory?.type) / 100
          : Number(selectedCategories?.OtCategory?.type),
    };

    // Recalculate dependent fields
    updatedRow.custom_net_wt =
      Number(updatedRow.custom_gross_wt) -
      (Number(updatedRow.custom_kun_wt) +
        Number(updatedRow.custom_cs_wt) +
        Number(updatedRow.custom_bb_wt) +
        Number(updatedRow.custom_other_wt));

    updatedRow.custom_amount =
      Number(updatedRow.custom_cs_amt) +
      Number(updatedRow.custom_kun_amt) +
      Number(updatedRow.custom_ot_amt) +
      Number(updatedRow.custom_other);

    return updatedRow;
  };

  // Helper function to round numbers to 3 decimal places
  const roundToThreeDecimal = (value: number): number => {
    return parseFloat(value.toFixed(3));
  };

  // Helper function to calculate `custom_bb_wt`
  const calculateBbWt = (data: any, selectedCategory: any): number => {
    let calculatedBbWt =
      Object?.keys(selectedCategory?.BbCategory)?.length > 0
        ? data?.custom_bb_wt - selectedCategory?.BbCategory?.type
        : data?.custom_bb_wt;

    return calculatedBbWt > 0 ? calculatedBbWt : 0; // Ensure non-negative value
  };

  // Helper function to calculate Kundan amount and unit
  const calculateKundanAmounts = (
    clientDetails: any,
    data: any
  ): { kunAmt: number; kunUnit: number } => {
    let kunAmt = 0; // Total amount for Kundan
    let kunUnit = 0; // Kundan unit calculation


    if (clientDetails?.material_data?.length > 0 && data?.material_table?.length > 0) {
      const kundanMaterialFromClient = clientDetails?.material_data.filter(
        (materialData: any) => materialData.material_group === "Kundan"
      );
      const kundanMaterialFromItem = data?.material_table.filter(
        (materialData: any) => materialData.material_group === "Kundan"
      );

      kundanMaterialFromClient.forEach((clientMaterial: any) => {
        kundanMaterialFromItem.forEach((itemMaterial: any) => {
          if (clientMaterial?.material === itemMaterial?.material) {
            kunAmt += clientMaterial.price * itemMaterial.pcs;
          }
        });
      });

      if (data?.custom_kun_pcs) {
        kunUnit = kunAmt / data?.custom_kun_pcs;
      }
    }

    return { kunAmt, kunUnit };
  };

  // Helper function to calculate `custom_net_wt`
  const calculateNetWt = (data: any, calculatedBbWt: number): number => {
    return (
      Number(data?.custom_gross_wt) -
      (Number(data?.custom_kun_wt) +
        Number(data?.custom_cs_wt) +
        Number(calculatedBbWt) +
        Number(data?.custom_other_wt))
    );
  };

  // Main update function
  const updateSalesTableData = (data?: any, id?: number, updateRow?: boolean) => {
    if (id) {
      setSalesTableData((prevSalesTableData: any) => {
        const updatedTable = prevSalesTableData?.map((tableData: any) => {
          if (tableData.idx === id) {
            // Calculate values
            const calculatedBbWt = calculateBbWt(data, selectedCategory);
            const { kunAmt, kunUnit } = calculateKundanAmounts(clientDetails, data);
            const customNetWt = calculateNetWt(data, calculatedBbWt);

            // Return updated row
            return {
              ...tableData,
              custom_gross_wt: roundToThreeDecimal(data?.custom_gross_wt),
              custom_kun_wt: roundToThreeDecimal(
                Object?.keys(selectedCategory?.KunCategory)?.length > 0
                  ? data?.custom_kun_wt * selectedCategory?.KunCategory?.type / 100
                  : data?.custom_kun_wt
              ),
              custom_cs_wt: roundToThreeDecimal(
                Object?.keys(selectedCategory?.CsCategory)?.length > 0
                  ? data?.custom_cs_wt * selectedCategory?.CsCategory?.type / 100
                  : 0
              ),
              custom_bb_wt: roundToThreeDecimal(calculatedBbWt),
              custom_other_wt: roundToThreeDecimal(
                Object?.keys(selectedCategory?.OtCategory)?.length > 0
                  ? data?.custom_other_wt * selectedCategory?.OtCategory?.type / 100
                  : 0
              ),
              custom_net_wt: roundToThreeDecimal(customNetWt),
              custom_kun_pc: roundToThreeDecimal(Number(data?.custom_kun_pcs)),
              custom_kun: roundToThreeDecimal(kunUnit),
              custom_kun_amt: roundToThreeDecimal(kunAmt),
              custom_pr_kun_wt: roundToThreeDecimal(Number(data?.custom_kun_wt)),
              custom_pr_cs_wt: roundToThreeDecimal(Number(data?.custom_cs_wt)),
              custom_pr_bb_wt: roundToThreeDecimal(Number(calculatedBbWt)),
              custom_pr_other_wt: roundToThreeDecimal(Number(data?.custom_other_wt)),
              warehouse: data?.custom_warehouse,
            };
          } else {
            return tableData;
          }
        });

        return updatedTable;
      });

      // Add new row if `updateRow` is true
      if (updateRow) {
        setSalesTableData((prevSalesTableData: any) => {
          const lastRow = prevSalesTableData[prevSalesTableData.length - 1];
          const isEmpty = Object.values(lastRow).every(
            (value) => value === null || value === ""
          );
          if (isEmpty) {
            return prevSalesTableData;
          } else {
            return [
              ...prevSalesTableData,
              Object?.keys(clientDetails)?.length > 0
                ? clientDetails?.tableData
                : newRowDataForSalesTable,
            ];
          }
        });
      }
    }
  };


  const updateBarcodeSalesTableData = (data: any, id?: number, addNewRow?: any) => {
    if (id) {
      setSalesTableData((prevSalesTableData: any) => {
        const updatedData = prevSalesTableData?.map((item: any) => {
          if (item.idx === id) {
            return {
              ...item,
              item_code: data?.item_code,
              custom_gross_wt: data?.custom_gross_wt,
              custom_kun_wt: data?.custom_kun_wt,
              custom_cs_wt: data?.custom_cs_wt,
              custom_bb_wt: data?.custom_bb_wt,
              custom_other_wt: data?.custom_other_wt,
              custom_net_wt: data?.custom_net_wt,
              custom_cs: data?.custom_cs,
              custom_cs_amt: data?.custom_cs_amt,
              custom_kun_pc: data?.custom_kun_pc,
              custom_kun: data?.custom_kun,
              custom_kun_amt: data?.custom_kun_amt,
              custom_ot_: data?.custom_ot_,
              custom_ot_amt: data?.custom_ot_amt,
              custom_other: data?.custom_other,
              custom_amount: data?.custom_amount,
            };
          } else {
            return item;
          }
        });
        return updatedData;
      });

      // Update state with new row
      if (addNewRow) {
        setSalesTableData((prevSalesTableData: any) => {
          const lastRow = prevSalesTableData[prevSalesTableData.length - 1];
          const isEmpty = Object.values(lastRow).every(
            (value) => value === null || value === ''
          );

          if (isEmpty) {
            return prevSalesTableData;
          } else {
            return [...prevSalesTableData, newRowDataForSalesTable];
          }
        });
      }
    }
  };

  const handleDeleteRowOfSalesTable: any = (id: any) => {
    if (salesTableData?.length > 1) {
      const updatedData =
        salesTableData?.length > 0 &&
        salesTableData !== null &&
        salesTableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, idx: index + 1 }));
      setSalesTableData(updatedData);
      setStateForDocStatus(true);
    }
  };

  const handleFixedAmt = (e: any) => {
    const { name, value } = e.target;
    setKunCsOtFixedAmt({ ...kunCsOtFixedAmt, [name]: value });

    setSalesTableData((prevData: any) => {
      return prevData.map((item: any, i: number) => {
        return {
          ...item,
          custom_cs: Number(name === 'csFixedAmt' ? value : item?.custom_cs),
          custom_kun: Number(name === 'kunFixedAmt' ? value : item?.custom_kun),
          custom_ot_: Number(name === 'otFixedAmt' ? value : item?.custom_ot_),
          custom_amount: Number(
            Number(item[i]?.custom_cs_amt) +
            Number(item[i]?.custom_kun_amt) +
            Number(item[i]?.custom_ot_amt) +
            Number(item[i]?.custom_other)
          ),
        };
      });
    });
    setStateForDocStatus(true);
  };

  return {
    handleAddRowForSales,
    salesTableData,
    SalesTableInitialState,
    setSalesTableData,
    setStateForDocStatus,
    kunCsOtFixedAmt,
    setKunCsOtFixedAmt,
    stateForDocStatus,
    handleEmptyDeliveryNote,
    selectedCategory,
    setSeletedCategory,
    setSelectedClient,
    setItemCodeDropdownReset,
    selectedClient,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    itemCodeDropdownReset,
    updateSalesTableData,
    handleDeleteRowOfSalesTable,
    handleFixedAmt,
    updateBarcodeSalesTableData,
    clientDetails,
    itemCodeDetails,
    setItemCodeDetails
  };
};
export default useCustomCustomerSalesHook;
