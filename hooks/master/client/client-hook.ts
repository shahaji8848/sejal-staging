import { useDeleteModal } from '@/hooks/DeleteModal/delete-modal-hook';
import MasterDeleteApi from '@/services/api/Master/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import postClientApi from '@/services/api/Master/post-client-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { getClientGroupData } from '@/store/slices/Master/get-client-group-slice';
import { get_client_name_data, getClientNameData } from '@/store/slices/Master/get-client-name-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useClienthook = () => {
    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [materialValue, setMaterialInputValue] = useState<any>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [clientData, setClientData] = useState<any>([])

    const clientDataFromStore = useSelector(get_client_name_data)?.data;

    useEffect(() => {
        dispatch(getClientNameData(loginAcessToken.token));
    }, [])

    useEffect(() => {

        if (clientDataFromStore?.length > 0) {
            setClientData([...clientDataFromStore])
        } else {
            setClientData([])
        }
    }, [clientDataFromStore])

    const handleDeleteBtn = async (name: any) => {
        if (name !== undefined && name !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Client',
                name
            );
            if (apiRes?.status === 202) {
                toast.success('Client Deleted Successfully!');
                dispatch(getClientNameData(loginAcessToken.token));
            } else {
                toast.error('Client cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))

    }
    const handleMaterialChange = (value: any, material: any, material_group: any, index: number) => {

        setMaterialInputValue((prevValue: any) => {
            // Create a copy of the current array
            const updatedValues = [...prevValue];

            // Ensure the target object exists at the given index
            if (!updatedValues[index]) {
                updatedValues[index] = { material: "", material_group: '', price: "" }; // Default structure
            }

            // Update the specific fields with validation for empty input
            updatedValues[index].material = material;
            updatedValues[index].material_group = material_group;
            updatedValues[index].price = value === "" ? "" : value; // Handle empty input

            return updatedValues; // Return the updated array
        });
    };


    const handleSaveBtn: any = async () => {
        const { client_name, client_group, sales_group, kundan_category, cs_category, bb_category, ot_category } = inputValue;

        // Validate required fields
        if (!client_name || !client_group || !sales_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_client',
            entity: 'client',
            client_name: client_name,
            client_group: client_group,
            sales_group: sales_group,
            kundan_category: kundan_category,
            cs_category: cs_category,
            ot_category: ot_category,
            bb_category: bb_category,
            materials: materialValue
        };

        // Call API
        let apiRes: any = await postClientApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Client Name Created');
            dispatch(getClientNameData(loginAcessToken?.token));
            setInputValue({})
            setMaterialInputValue([])
        } else {
            toast.error('Client Name already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { client_name, client_group, sales_group, kundan_category, cs_category, bb_category, ot_category } = inputValue;

        // Validate required fields
        if (!client_name || !client_group || !sales_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'client',
            method: 'update_client_detail',
            client_name: client_name,
            name: client_name,
            client_group: client_group,
            sales_group: sales_group,
            kundan_category: kundan_category,
            cs_category: cs_category,
            ot_category: ot_category,
            bb_category: bb_category,
            materials: materialValue
        };

        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getClientNameData(loginAcessToken.token));
            toast.success('Client Updated');
            setShowModal(false)
        } else {
            toast.error('Client Name already exists');
        }
    }
    const handleUpdateBtn: any = (data: any) => {
        setInputValue(data);
        setMaterialInputValue(data?.materials)
        setShowModal(true);
    }

    return {
        clientData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleMaterialChange,
        materialValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord
    }
}

export default useClienthook;