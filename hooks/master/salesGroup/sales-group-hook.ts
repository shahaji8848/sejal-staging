
import MasterDeleteApi from '@/services/api/Master/common/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/common/master-update-api';
import postSalesGroupApi from '@/services/api/Master/sales-group/post-sales-group-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_sales_group_data, getSalesGroupData } from '@/store/slices/Master/get-sales-group-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useSalesGroupHook = () => {

    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [salesGroupData, setSalesGroupData] = useState<any>([])

    const salesGroupDataFromStore = useSelector(get_sales_group_data)?.data;

    useEffect(() => {
        dispatch(getSalesGroupData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (salesGroupDataFromStore?.length > 0) {
            setSalesGroupData([...salesGroupDataFromStore])
        } else {
            setSalesGroupData([])
        }
    }, [salesGroupDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.sales_group !== undefined && data?.sales_group !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Sales Group',
                data?.sales_group
            );
            if (apiRes?.status === 202) {
                toast.success('Sales Group Deleted Successfully!');
                dispatch(getSalesGroupData(loginAcessToken.token));

            } else {
                toast.error('Sales Group cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { sales_group } = inputValue;

        // Validate required fields
        if (!sales_group) {
            toast.error('Sales Group is mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_sales_group',
            entity: 'sales_group',
            sales_group: sales_group
        };

        // Call API
        let apiRes: any = await postSalesGroupApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            toast.success('Sales Group Created');
            dispatch(getSalesGroupData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error(`${apiRes?.data?.message?.error}`);
        }
    }

    const handleUpdateRecord: any = async () => {
        const { sales_group } = inputValue;

        // Validate required fields
        if (!sales_group) {
            toast.error('Sales Group is mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'sales_group',
            method: 'update_sales_group_detail',
            name: prevInputValue?.sales_group,
            sales_group: inputValue?.sales_group,

        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getSalesGroupData(loginAcessToken.token));
            toast.success('Sales Group Updated');
            setShowModal(false)
            setInputValue({})
        } else {
            toast.error(`${apiRes?.data?.message?.message}`);
        }
    }
    const handleUpdateBtn: any = (data: any) => {
        setInputValue(data);
        setPrevInputValue(data)
        setShowModal(true);
    }

    return {
        salesGroupData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord
    }
}

export default useSalesGroupHook