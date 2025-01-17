
import MasterDeleteApi from '@/services/api/Master/common/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/common/master-update-api';
// import postFewApi from '@/services/api/Master/few/post-few-api';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postMaterialMasterApi from '@/services/api/Master/post-material-name';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_material_data, getMaterialData } from '@/store/slices/Master/get-material-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useMaterialHook = () => {
    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [materialData, setMaterialData] = useState<any>([])

    const getMaterialDataFromStore: any = useSelector(get_material_data)?.data;

    useEffect(() => {
        dispatch(getMaterialData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (getMaterialDataFromStore?.length > 0) {
            setMaterialData([...getMaterialDataFromStore])
        } else {
            setMaterialData([])
        }
    }, [getMaterialDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.material !== undefined && data?.material !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Material',
                data?.material
            );
            if (apiRes?.status === 202) {
                toast.success('Material Deleted Successfully!');
                dispatch(getMaterialData(loginAcessToken.token));
            } else {
                toast.error('Material cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { material, material_abbr, material_group } = inputValue;

        // Validate required fields
        if (!material || !material_abbr || !material_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_material',
            entity: 'material',
            data: [{
                material: inputValue?.material,
                material_abbr: inputValue?.material_abbr,
                material_group: inputValue?.material_group
            }],
        };

        // Call API
        let apiRes: any = await postMaterialMasterApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Material Created');
            dispatch(getMaterialData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error('Material already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { material, material_abbr, material_group } = inputValue;

        // Validate required fields
        if (!material || !material_abbr || !material_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }


        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'material',
            method: 'update_material_detail',
            name: prevInputValue?.material,
            material_name: inputValue?.material,
            material_abbr: inputValue?.material_abbr,
            material_group: inputValue?.material_group,
        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getMaterialData(loginAcessToken.token));
            toast.success('Material Updated');
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
        materialData,
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

export default useMaterialHook;