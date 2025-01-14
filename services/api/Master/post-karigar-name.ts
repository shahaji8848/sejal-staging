import { CONSTANTS } from '../../config/api-config';
import { callPostAPI } from '../utils';

const postKarigarApi = async (get_access_token: any, val: any) => {
  let response: any;
  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

  response = await callPostAPI(url, val, get_access_token);
  return response;
};

export default postKarigarApi;
