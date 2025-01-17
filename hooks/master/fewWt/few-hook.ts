import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MasterDeleteApi from '@/services/api/Master/common/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/common/master-update-api';
import postFewApi from '@/services/api/Master/few/post-few-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_few_data, getFewData } from '@/store/slices/Master/get-few-slice';

const useFewHook = () => {

    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [fewData, setFewData] = useState<any>([])

    const fewDataFromStore: any = useSelector(get_few_data)?.data;

    useEffect(() => {
        dispatch(getFewData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (fewDataFromStore?.length > 0) {
            setFewData([...fewDataFromStore])
        } else {
            setFewData([])
        }
    }, [fewDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.few !== undefined && data?.few !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Few Master',
                data?.few
            );
            if (apiRes?.status === 202) {
                toast.success('Few Master Deleted Successfully!');
                dispatch(getFewData(loginAcessToken.token));
            } else {
                toast.error('Few Master cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { few, few_abbr, material_group } = inputValue;

        // Validate required fields
        if (!few || !few_abbr || !material_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_few',
            entity: 'few_master',
            data: [{
                few: inputValue?.few,
                few_abbr: inputValue?.few_abbr,
                material_group: inputValue?.material_group
            }],
        };

        // Call API
        let apiRes: any = await postFewApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            toast.success('Few Master Created');
            dispatch(getFewData(loginAcessToken.token));
            setInputValue({})
        } else {
            toast.error('Few Master already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { few, few_abbr, material_group } = inputValue;

        // Validate required fields
        if (!few || !few_abbr || !material_group) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'few_master',
            method: 'update_few_detail',
            name: prevInputValue?.few,
            few: inputValue?.few,
            few_abbr: inputValue?.few_abbr,
            material_group: inputValue?.material_group

        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getFewData(loginAcessToken.token));
            toast.success('Few Updated');
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
        fewData,
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

export default useFewHook;