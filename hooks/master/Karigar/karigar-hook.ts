import MasterDeleteApi from '@/services/api/Master/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_karigar_name_data, getKarigarNameData } from '@/store/slices/Master/karigar-name-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useKarigarHook = () => {

    const dispatch = useDispatch();
    const loginAcessToken = useSelector(get_access_token);
    const [inputValue, setInputValue] = useState<any>({})
    const [prevInputValue, setPrevInputValue] = useState<any>({})
    const [showModal, setShowModal] = useState<boolean>(false)
    const [karigarData, setKarigarData] = useState<any>([])

    const karigarDataFromStore = useSelector(get_karigar_name_data)?.data;

    useEffect(() => {
        dispatch(getKarigarNameData(loginAcessToken.token));
    }, [])

    useEffect(() => {
        if (karigarDataFromStore?.length > 0) {
            setKarigarData([...karigarDataFromStore])
        } else {
            setKarigarData([])
        }
    }, [karigarDataFromStore])

    const handleDeleteBtn = async (data: any) => {
        if (data?.karigar_code !== undefined && data?.karigar_code !== '') {
            const apiRes = await MasterDeleteApi(
                loginAcessToken?.token,
                'Karigar',
                data?.karigar_code
            );
            if (apiRes?.status === 202) {
                toast.success('Karigar Deleted Successfully!');
                dispatch(getKarigarNameData(loginAcessToken.token));
            } else {
                toast.error('Karigar cannot be deleted');
            }
        }
    };

    const handleInputChange: any = (value: any, fieldName: any) => {
        setInputValue((prevValue: any) => ({
            ...prevValue, [fieldName]: value
        }))
    }

    const handleSaveBtn: any = async () => {
        const { karigar_name, karigar_code } = inputValue;

        // Validate required fields
        if (!karigar_name || !karigar_code) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            method: 'create_karigar',
            entity: 'karigar',
            karigar_name: inputValue?.karigar_name,
            karigar_code: inputValue?.karigar_code,
        };

        // Call API
        let apiRes: any = await postKunKarigarApi(loginAcessToken?.token, values);

        if (apiRes?.status === 'success') {
            toast.success('Karigar Name Created');
            dispatch(getKarigarNameData(loginAcessToken?.token));
            setInputValue({})
        } else {
            toast.error('Karigar Name already exists');
        }
    }

    const handleUpdateRecord: any = async () => {
        const { karigar_name, karigar_code } = inputValue;

        // Validate required fields
        if (!karigar_name || !karigar_code) {
            toast.error('All fields marked with * are mandatory.');
            return;
        }

        // Prepare API payload
        const values = {
            version: 'v1',
            entity: 'karigar',
            method: 'update_karigar_detail',
            name: prevInputValue?.karigar_code,
            karigar_name: inputValue?.karigar_name,
            karigar_code: inputValue?.karigar_code,

        };
        // Call API
        let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

        if (apiRes?.data?.message?.status === 'success') {
            dispatch(getKarigarNameData(loginAcessToken.token));
            toast.success('Karigar Updated');
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
        karigarData,
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

export default useKarigarHook