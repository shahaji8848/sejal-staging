import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getOtCategoryData } from '@/store/slices/Master/get-ot-category-slice';
import { getBBCategoryData } from '@/store/slices/Master/get-bb-category-slice';
import { getCategoryData } from '@/store/slices/Master/get-category-slice';
import { getClientGroupData } from '@/store/slices/Master/get-client-group-slice';
import { getClientNameData } from '@/store/slices/Master/get-client-name-slice';
import { getCsCategoryData } from '@/store/slices/Master/get-cs-category-slice';
import { getKunCategoryData } from '@/store/slices/Master/get-kun-category-slice';
import { getMaterialGroupData } from '@/store/slices/Master/get-material-group-slice';
import { getMaterialData } from '@/store/slices/Master/get-material-slice';
import { getSalesGroupData } from '@/store/slices/Master/get-sales-group-slice';
import { getSubCategoryData } from '@/store/slices/Master/get-sub-category-slice';
import { getKarigarNameData } from '@/store/slices/Master/karigar-name-slice';
import { getKunKarigarNameData } from '@/store/slices/Master/kun-karigar-name-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useDispatch, useSelector } from 'react-redux';

export const useMasterListingHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    const getData = () => {
      dispatch(getKarigarNameData(loginAcessToken.token));
      dispatch(getKunKarigarNameData(loginAcessToken.token));
      dispatch(getMaterialGroupData(loginAcessToken.token));
      dispatch(getMaterialData(loginAcessToken.token));
      dispatch(getClientGroupData(loginAcessToken.token));
      dispatch(getClientNameData(loginAcessToken.token));
      dispatch(getSalesGroupData(loginAcessToken.token));
      dispatch(getKunCategoryData(loginAcessToken.token));
      dispatch(getCsCategoryData(loginAcessToken.token));
      dispatch(getOtCategoryData(loginAcessToken.token));
      dispatch(getBBCategoryData(loginAcessToken.token));
      dispatch(getCategoryData(loginAcessToken.token));
      dispatch(getSubCategoryData(loginAcessToken.token));
    };
    if (query?.karigarId === 'karigar') {
      getData();
    }
  }, [loginAcessToken]);
};
