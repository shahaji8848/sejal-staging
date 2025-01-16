import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_material_group_data, getMaterialGroupData } from '@/store/slices/Master/get-material-group-slice';
import MasterDeleteApi from '@/services/api/Master/common/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/common/master-update-api';

const useMaterialGroupHook = () => {
    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [materialGroupData, setMaterialGroupData] = useState<any>([])

    const materialGroupDataFromStore = useSelector(get_material_group_data)?.data;

    useEffect(() => {
        dispatch(getMaterialGroupData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (materialGroupDataFromStore?.length > 0) {
            setMaterialGroupData([...materialGroupDataFromStore])
        } else {
            setMaterialGroupData([])
        }
    }, [materialGroupDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.material_group !== undefined && data?.material_group !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Material Group',
                data?.material_group
            );
            if (apiRes?.status === 202) {
                toast.success('Material Group Deleted Successfully!');
                dispatch(getMaterialGroupData(loginAcessToken.token));
            } else {
                toast.error('Material Group cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { material_group } = inputValue;

        // Validate required fields
        if (!material_group) {
            toast.error('Material Group mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_material_group',
            entity: 'material_group',
            material_group: material_group,
        };

        // Call API
        let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Material Group Created');
            dispatch(getMaterialGroupData(loginAcessToken?.token));
            setInputValue({})
        } else {
            toast.error('Material Group already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { material_group } = inputValue;

        if (!material_group) {
            toast.error('Material Group mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'material_group',
            method: 'update_material_group_detail',
            name: prevInputValue?.material_group,
            material_group: material_group

        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);
        console.log({ apiRes })
        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getMaterialGroupData(loginAcessToken.token));
            toast.success('Material Group Updated');
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
        materialGroupData,
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

export default useMaterialGroupHook