import postKarigarApi from '@/services/api/Master/post-karigar-name';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import {
  getKarigarNameData,
  get_karigar_name_data,
} from '@/store/slices/Master/karigar-name-slice';
import {
  getKunKarigarNameData,
  get_kun_karigar_name_data,
} from '@/store/slices/Master/kun-karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteModal } from '../DeleteModal/delete-modal-hook';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import MasterDeleteApi from '@/services/api/Master/master-delete-api';

const useKarigarHooks = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useDeleteModal();
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [originalName, setOriginalName] = useState();
  const dispatch = useDispatch();

  const router = useRouter();
  const loginAcessToken = useSelector(get_access_token);
  const show = useRef<boolean>(false);

  let karigarList = useSelector(get_karigar_name_data).data;
  let kunKarigarList = useSelector(get_kun_karigar_name_data).data;

  //post karigar name
  const [inputValue, setInputValue] = useState({ name: '', karigar_code: '' });
  const [error, setError] = useState('');
  const HandleSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_karigar',
      entity: 'karigar',
      karigar_name: inputValue.name,
      karigar_code: inputValue.karigar_code
    };
    if (inputValue?.name === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await postKarigarApi(loginAcessToken?.token, values);

      if (apiRes?.data?.message?.status === 'success') {
        toast.success('Karigar Name Created');
        dispatch(getKarigarNameData(loginAcessToken.token));
      } else {
        toast.error(apiRes?.data?.message?.error);
      }
      setError('');
      setInputValue({ name: '', karigar_code: '' });
    }
  };
  const HandleInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValue((prevValue: any) => ({
      ...prevValue, // Preserve existing values
      [name]: value // Dynamically update the value for the given input's name
    }));

    setError(''); // Clear the error state
  };

  const handleUpdateKarigar = async () => {
    const body = {
      version: 'v1',
      entity: 'karigar',
      method: 'update_karigar_detail',
      name: originalName,
      karigar_name: inputValue?.name,
      karigar_code: inputValue?.karigar_code,
    };
    if (inputValue.name === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (
        apiRes?.data?.message?.status === 'success' &&
        apiRes?.hasOwnProperty('data')
      ) {
        toast.success('Karigar Name Updated Successfully!');
        dispatch(getKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Karigar Name already exist');
      }
      setError('');
      setInputValue({ name: '', karigar_code: '' });
    }
    setShowAddRecord(false);
  };
  const handleDeleteKarigar = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Karigar',
        name
      );
      if (apiRes?.status === 202) {
        toast.success('Karigar successfully deleted!');
        dispatch(getKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Karigar cannot be deleted');
      }
      setShowDeleteModal(false);
    }
  };
  // post kundan karigar api
  const HandleKunSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_kundan_karigar',
      entity: 'kundan_karigar',
      karigar_name: inputValue?.name,
      karigar_code: inputValue?.karigar_code,
    };
    if (inputValue.name === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await postKunKarigarApi(loginAcessToken?.token, values);

      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Kundan Karigar Name Created');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
      } else {
        toast.error(apiRes?.error);
      }
      setError('');
      setInputValue({ name: '', karigar_code: '' });
    }
  };
  const HandleKunInputValue = (e: any) => {
    const { name, value } = e.target

    setInputValue((prevValue: any) => ({
      ...prevValue, [name]: value
    }))
    setError('');

  };
  const handleUpdateKunKarigar = async () => {
    const body = {
      version: 'v1',
      entity: 'kundan_karigar',
      method: 'update_kundan_karigar_detail',
      name: originalName,
      karigar_name: inputValue?.name,
      karigar_code: inputValue?.karigar_code,
      warehouse: 'Mumbai - 8DL',
    };
    if (inputValue.name === '') {
      setError('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (
        apiRes?.data?.message?.status === 'success' &&
        apiRes?.hasOwnProperty('data')
      ) {
        toast.success('Kundan Karigar Name Updated Successfully!');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Kundan Karigar Name already exist');
      }
      setError('');
      setInputValue({ name: '', karigar_code: '' });
      setShowAddRecord(false);
    }
  };
  const handleDeleteKunKarigar = async (name: any) => {
    if (name !== undefined && name !== '') {
      let apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Kundan Karigar',
        name
      );
      if (apiRes?.status === 202) {
        toast.success('Kundan Karigar successfully deleted!');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
      } else {
        toast.error('Kundan Karigar cannot be deleted');
      }
      setShowDeleteModal(false);
    }
  };
  // Add Record Functions
  const handleCloseAddRecord = () => {
    setShowAddRecord(false), setInputValue({ name: '', karigar_code: '' });
  };
  const handleShowAddRecord = (item: any) => {
    setInputValue({ name: item?.karigar_name, karigar_code: item?.karigar_code });
    setOriginalName(item?.karigar_name);
    setShowAddRecord(true);
  };


  return {
    karigarList,
    kunKarigarList,
    inputValue,
    setInputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
    router,
    show,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    handleUpdateKarigar,
    handleUpdateKunKarigar,
    handleDeleteKarigar,
    handleDeleteKunKarigar,
  };
};

export default useKarigarHooks;
