import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getItemDetailsInSalesApi = async (
  get_access_token: any,
  item_code: any,
  method: any,
  entity: any
) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=${method}&entity=${entity}&name=${item_code}`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getItemDetailsInSalesApi;
