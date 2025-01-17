import getRRStockItemApi from '@/services/api/PurchaseReceipt/ReadyReceiptReturn/get-ready-receipt-item-with-stock-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useReadyReceiptReturnHook: any = () => {
    const { query } = useRouter();
    const loginAcessToken = useSelector(get_access_token);

    const [readyReceiptItemWithStock, setReadyReceiptItemWithStock] = useState<any>([])

    const getItemData: any = async () => {
        let getItemCodeData: any = await getRRStockItemApi(loginAcessToken?.token)

        if (getItemCodeData?.data?.message?.status === "success") {
            setReadyReceiptItemWithStock(getItemCodeData?.data?.message?.data)
        } else {
            setReadyReceiptItemWithStock([])
        }
    }

    useEffect(() => {
        if (query?.receipt === "return") {
            getItemData()
        } else {
            setReadyReceiptItemWithStock([])
        }
    }, [query])

    return {
        readyReceiptItemWithStock
    }
}

export default useReadyReceiptReturnHook;