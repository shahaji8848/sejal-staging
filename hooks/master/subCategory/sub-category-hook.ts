import MasterDeleteApi from '@/services/api/Master/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import postSubCategoryApi from '@/services/api/Master/post-sub-category-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_sub_category_data, getSubCategoryData } from '@/store/slices/Master/get-sub-category-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useSubCategoryCodeHook = () => {
    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [subCategoryCodeData, setSubCategoryCodeData] = useState<any>([])
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const subCategoryDataFromStore: any = useSelector(get_sub_category_data)?.data;


    useEffect(() => {
        dispatch(getSubCategoryData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (subCategoryDataFromStore?.length > 0) {
            setSubCategoryCodeData([...subCategoryDataFromStore])
        } else {
            setSubCategoryCodeData([])
        }
    }, [subCategoryDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.code !== undefined && data?.code !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Sub Category',
                data?.code
            );
            if (apiRes?.status === 202) {
                toast.success('Sub-Category Deleted Successfully!');
                dispatch(getSubCategoryData(loginAcessToken.token));
                setInputValue({})
            } else {
                toast.error('Sub-Category cannot be deleted');
            }
        }
    };


    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { code, category, sub_category } = inputValue;

        // Validate required fields
        if (!code || !category || !sub_category) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }
        console.log({ code })
        if (code?.length < 3 || code?.length > 5) {
            toast.error('Subcategory name must be in between 3 to 5 letters.');
            return
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_subcategory',
            entity: 'category',
            code: inputValue?.code,
            category: inputValue?.category,
            sub_category: inputValue?.sub_category,
        };

        // Call API
        let apiRes: any = await postSubCategoryApi(loginAcessToken?.token, values);
        if (apiRes?.status === 'success') {
            toast.success('Sub Category Created');
            dispatch(getSubCategoryData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error(`${apiRes?.message}`);
        }
    }

    const handleUpdateRecord: any = async () => {
        const { code, category, sub_category } = inputValue;

        // Validate required fields
        if (!code || !category || !sub_category) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'category',
            method: 'update_sub_category_details',
            name: prevInputValue?.code,
            code: code,
            category: inputValue?.category,
            sub_category: inputValue?.sub_category,
        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getSubCategoryData(loginAcessToken.token));
            toast.success('Sub Category Updated');
            setShowModal(false)
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
        subCategoryCodeData,
        handleDeleteBtn,
        handleInputChange,
        inputValue,
        setInputValue,
        handleSaveBtn,
        handleUpdateBtn,
        showModal,
        setShowModal,
        handleUpdateRecord,
    }
}

export default useSubCategoryCodeHook