import { getBBCategoryData } from '@/store/slices/Master/get-bb-category-slice';
import { getCsCategoryData } from '@/store/slices/Master/get-cs-category-slice';
import { getKunCategoryData } from '@/store/slices/Master/get-kun-category-slice';
import { getMaterialData } from '@/store/slices/Master/get-material-slice';
import { getOtCategoryData } from '@/store/slices/Master/get-ot-category-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMasterListingHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    const getData = () => {

      dispatch(getMaterialData(loginAcessToken.token));


      dispatch(getKunCategoryData(loginAcessToken.token));
      dispatch(getCsCategoryData(loginAcessToken.token));
      dispatch(getOtCategoryData(loginAcessToken.token));
      dispatch(getBBCategoryData(loginAcessToken.token));

    };
    if (query?.karigarId === 'karigar') {
      getData();
    }
  }, [loginAcessToken]);
};
