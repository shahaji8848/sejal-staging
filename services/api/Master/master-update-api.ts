import { CONSTANTS } from '@/services/config/api-config';
import { callPutAPI } from '../utils';

const MasterUpdateApi: any = async (token: any, body: any) => {
  let response: any;

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

  response = await callPutAPI(url, body, token);
  return response;
};

export default MasterUpdateApi;
