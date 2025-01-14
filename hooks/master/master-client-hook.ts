import MasterDeleteApi from '@/services/api/Master/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/master-update-api';
import postClientApi from '@/services/api/Master/post-client-api';
import {
  getClientGroupData,
  get_client_group_data,
} from '@/store/slices/Master/get-client-group-slice';
import {
  getClientNameData,
  get_client_name_data,
} from '@/store/slices/Master/get-client-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteModal } from '../DeleteModal/delete-modal-hook';
import postGroupDataApi from '@/services/api/Master/post-client-group-api';
const useClientHook = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
  }: any = useDeleteModal();
  const [showAddRecord, setShowAddRecord] = useState(false);

  const dispatch = useDispatch();
  // access token
  const loginAcessToken = useSelector(get_access_token);
  // Listing states
  let clientList = useSelector(get_client_name_data).data;
  let clientGroupList = useSelector(get_client_group_data).data;

  const [searchClient, setSearchClient] = useState('');
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  const [errorC1, setError1] = useState('');
  const [errorC2, setError2] = useState('');
  const [errorC3, setError3] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [clientName, setClientNameValue] = useState({
    material: '',
    material_abbr: '',
  });

  const [originalName, setOriginalName] = useState();

  useEffect(() => {
    setClientNameValue({
      ...clientName,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  }, []);
  const HandleClientNameChange = (e: any) => {
    const { value } = e.target;

    setClientNameValue({
      ...clientName,
      material: value,
      material_abbr: searchClient,
    });
    setError1('');
    setError2('');
  };
  const HandleClientSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_client',
      entity: 'client',
      client_name: clientName?.material,
      client_group: searchClient,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await postClientApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success') {
        toast.success('Client Name Created');
        dispatch(getClientNameData(loginAcessToken.token));
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
    }
  };
  const handleUpdateClient = async () => {
    const body = {
      version: 'v1',
      entity: 'client',
      method: 'update_client_detail',
      name: originalName,
      client_group: searchClient,
      client_name: clientName?.material,
    };
    if (clientName?.material === '' || clientName.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      clientName.material_abbr === '' ||
      clientName.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (apiRes?.data?.message?.status === 'success') {
        toast.success('Client Name Created');
        dispatch(getClientNameData(loginAcessToken.token));
      } else {
        toast.error('Client Name already exist');
      }
      setError1('');
      setClientNameValue({
        material: '',
        material_abbr: '',
      });
      setSelectDropDownReset(true);
      setShowAddRecord(false);
    }
  };
  const handleDeleteClient = async (name: any) => {
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
      setShowDeleteModal(false);
    }
  };
  // client group post api
  const HandleClientGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_client_group',
      entity: 'client_group',
      client_group: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setError1('Input field cannot be empty');
    } else {
      let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Client Group Created');
        dispatch(getClientGroupData(loginAcessToken.token));
      } else {
        toast.error('Client Group already exist');
      }
      setError1('');
      setInputValue1('');
    }
  };
  const HandleClientGrpValue = (e: any) => {
    setError1('');
    setInputValue1(e.target.value);
  };
  const handleSelectClientGroup = (value: any) => {
    setSearchClient(value);
  };
  const handleUpdateClientGroup = async () => {
    const body = {
      version: 'v1',
      entity: 'client_group',
      method: 'update_client_group_detail',
      name: originalName,
      client_group: inputValue1,
    };
    if (inputValue1.trim() === '') {
      setError1('Input field cannot be empty');
    } else {
      let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, body);
      if (
        apiRes?.data?.message?.status === 'success' &&
        apiRes?.hasOwnProperty('data')
      ) {
        toast.success('Client Group Updated Successfully!');
        dispatch(getClientGroupData(loginAcessToken.token));
      } else {
        toast.error('Client Group already exist');
      }
      setError1('');
      setInputValue1('');
      setShowAddRecord(false);
    }
  };
  const handleDeleteClientGroup = async (name: any) => {
    if (name !== undefined && name !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Client Group',
        name
      );
      if (apiRes?.status === 202) {
        toast.success('Client Group Deleted Successfully!');
        dispatch(getClientGroupData(loginAcessToken.token));
      } else {
        toast.error('Client Group cannot be deleted');
      }
      setShowDeleteModal(false);
    }
  };

  const handleCloseAddRecord = () => setShowAddRecord(false);
  const handleShowAddRecord = (item: any) => {
    if (item?.karigar_name) {
      setOriginalName(item?.karigar_name);
    } else {
      setClientNameValue(item);
      setSearchClient(item?.material_abbr);
      setOriginalName(item?.material);
    }
    setShowAddRecord(true);
  };
  return {
    clientList,
    clientGroupList,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    showAddRecord,
    handleCloseAddRecord,
    handleShowAddRecord,
    errorC1,
    errorC2,
    selectDropDownReset,
    HandleClientNameChange,
    HandleClientSave,
    handleUpdateClient,
    handleDeleteClient,
    inputValue1,
    HandleClientGrpSubmit,
    HandleClientGrpValue,
    handleSelectClientGroup,
    handleUpdateClientGroup,
    handleDeleteClientGroup,
  };
};
export default useClientHook;
