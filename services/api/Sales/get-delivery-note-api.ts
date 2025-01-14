import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getDeliveryNoteApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getDeliveryNoteApi;
