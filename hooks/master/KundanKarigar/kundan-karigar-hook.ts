
import MasterDeleteApi from '@/services/api/Master/common/master-delete-api';
import MasterUpdateApi from '@/services/api/Master/common/master-update-api';
import postKunKarigarApi from '@/services/api/Master/post-kundan-karigar-name';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { get_material_group_data } from '@/store/slices/Master/get-material-group-slice';
import { get_kun_karigar_name_data, getKunKarigarNameData } from '@/store/slices/Master/kun-karigar-name-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useKundanKarigarHook = () => {

  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);
  const [inputValue, setInputValue] = useState<any>({})
  const [materialValue, setMaterialInputValue] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [kundanKarigarData, setKundanKarigarData] = useState<any>([])
  const [prevInputValue, setPrevInputValue] = useState<any>({})
  const kundanKarigarDataFromStore: any = useSelector(get_kun_karigar_name_data)?.data;
  const materialGroupDataFromStore: any = useSelector(get_material_group_data)?.data;

  useEffect(() => {
    dispatch(getKunKarigarNameData(loginAcessToken.token))
  }, [])

  useEffect(() => {
    if (kundanKarigarDataFromStore?.length > 0) {
      setKundanKarigarData([...kundanKarigarDataFromStore])
    } else {
      setKundanKarigarData([])
    }
  }, [kundanKarigarDataFromStore])

  const handleDeleteBtn = async (data: any) => {
    if (data?.karigar_code !== undefined && data?.karigar_code !== '') {
      const apiRes = await MasterDeleteApi(
        loginAcessToken?.token,
        'Kundan Karigar',
        data?.karigar_code
      );
      if (apiRes?.status === 202) {
        toast.success('Kundan Karigar Deleted Successfully!');
        dispatch(getKunKarigarNameData(loginAcessToken.token));
        setInputValue({})
      } else {
        toast.error('Kundan Karigar cannot be deleted');
      }
    }
  };

  const handleMaterialChange = (value: any, material: any, material_group: any, index: number) => {


    setMaterialInputValue((prevValue: any) => {
      // Create a copy of the array
      const updatedValues = [...prevValue];

      // Ensure the target object exists at the given index
      if (!updatedValues[index]) {
        updatedValues[index] = { material: "", material_group: "", price: "" }; // Default structure
      } else {
        // Create a new object for immutability
        updatedValues[index] = {
          ...updatedValues[index],
          material: material,
          material_group: material_group,
          price: value === "" ? "" : value, // Handle empty input
        };
      }

      return updatedValues; // Return the updated array
    });
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
      method: 'create_kundan_karigar',
      entity: 'kundan_karigar',
      karigar_name: inputValue?.karigar_name,
      karigar_code: inputValue?.karigar_code,
      material_group: inputValue?.material_group,
      materials: materialValue
    };

    // Call API
    let apiRes: any = await postKunKarigarApi(loginAcessToken?.token, values);

    if (apiRes?.status === 'success') {
      toast.success('Kundan Karigar Created');
      dispatch(getKunKarigarNameData(loginAcessToken.token));
      setInputValue({})
      setMaterialInputValue([])
    } else {
      toast.error('Kundan Karigar Name already exists');
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
      entity: 'kundan_karigar',
      method: 'update_kundan_karigar_detail',
      name: prevInputValue?.karigar_code,
      karigar_name: inputValue?.karigar_name,
      karigar_code: inputValue?.karigar_code,
      material_group: inputValue?.material_group,
      materials: materialValue
    };
    // Call API
    let apiRes: any = await MasterUpdateApi(loginAcessToken?.token, values);

    if (apiRes?.data?.message?.status === 'success') {
      dispatch(getKunKarigarNameData(loginAcessToken.token))
      toast.success('Kundan Karigar Updated');
      setShowModal(false)
    } else {
      toast.error(`${apiRes?.data?.message?.message}`);
    }
  }
  const handleUpdateBtn: any = (data: any) => {
    setInputValue(data);
    setMaterialInputValue(data?.materials)
    setPrevInputValue(data)
    setShowModal(true);
  }

  return {
    kundanKarigarData,
    handleDeleteBtn,
    handleInputChange,
    inputValue,
    setInputValue,
    handleSaveBtn,
    handleUpdateBtn,
    showModal,
    setShowModal,
    handleUpdateRecord,
    handleMaterialChange,
    materialValue,
    setMaterialInputValue
  }
}

export default useKundanKarigarHook