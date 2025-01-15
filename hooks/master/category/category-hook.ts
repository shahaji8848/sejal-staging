import MasterDeleteApi from "@/services/api/Master/master-delete-api";
import MasterUpdateApi from "@/services/api/Master/master-update-api";
import postCategoryApi from "@/services/api/Master/post-category-api";
import { get_access_token } from "@/store/slices/auth/login-slice";
import { get_category_data, getCategoryData } from "@/store/slices/Master/get-category-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCategoryHook = () => {

    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [categoryData, setCategoryData] = useState<any>([])

    const categoryDataFromStore: any = useSelector(get_category_data)?.data;

    useEffect(() => {
        dispatch(getCategoryData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (categoryDataFromStore?.length > 0) {
            setCategoryData([...categoryDataFromStore])
        } else {
            setCategoryData([])
        }
    }, [categoryDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.category_name !== undefined && data?.category_name !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Category',
                data?.category_name
            );
            if (apiRes?.status === 202) {
                toast.success('Category Deleted Successfully!');
                dispatch(getCategoryData(loginAcessToken.token));
            } else {
                toast.error('Category cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { category_name } = inputValue;

        // Validate required fields
        if (!category_name) {
            toast.error('Category is mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_category',
            entity: 'category',
            category_name: inputValue?.category_name
        };

        // Call API
        let apiRes: any = await postCategoryApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Category is Created');
            dispatch(getCategoryData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error('Category already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { category_name } = inputValue;

        // Validate required fields
        if (!category_name) {
            toast.error('Category is mandatory.');
            return;
        }
        console.log({ prevInputValue })
        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'category',
            method: 'update_category_details',
            name: prevInputValue?.category_name,
            category_name: inputValue?.category_name
        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getCategoryData(loginAcessToken.token));
            toast.success('Category Updated');
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
        categoryData,
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

export default useCategoryHook;