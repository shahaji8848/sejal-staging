import MasterDeleteApi from '@/services/api/Master/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_client_group_data, getClientGroupData } from '@/store/slices/Master/get-client-group-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClientGroupHook = () => {

    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [clientGroupData, setClientGroupData] = useState<any>([])

    const clientDataFromStore: any = useSelector(get_client_group_data)?.data;

    useEffect(() => {
        dispatch(getClientGroupData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (clientDataFromStore?.length > 0) {
            setClientGroupData([...clientDataFromStore])
        } else {
            setClientGroupData([])
        }
    }, [clientDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.client_group !== undefined && data?.client_group !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Client Group',
                data?.client_group
            );
            if (apiRes?.status === 202) {
                toast.success('Client Group Deleted Successfully!');
                dispatch(getClientGroupData(loginAcessToken.token));
            } else {
                toast.error('Client Group cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { client_group } = inputValue;

        // Validate required fields
        if (!client_group) {
            toast.error('Client Group is mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_client_group',
            entity: 'client_group',
            client_group: inputValue?.client_group
        };

        // Call API
        let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Client Group is Created');
            dispatch(getClientGroupData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error('Client Group already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { client_group } = inputValue;

        // Validate required fields
        if (!client_group) {
            toast.error('Client Group is mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'client_group',
            method: 'update_client_group_detail',
            name: prevInputValue?.client_group,
            client_group: inputValue?.client_group
        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getClientGroupData(loginAcessToken.token));
            toast.success('Client Group Updated');
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
        clientGroupData,
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

export default useClientGroupHook;