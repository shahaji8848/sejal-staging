import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getDeliveryNoteListing = async (get_access_token: any, params: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${params?.version}&method=${params?.method}&entity=${params?.entity}`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getDeliveryNoteListing;
