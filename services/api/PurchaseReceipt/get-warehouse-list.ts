import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getWarehouseListApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_warehouse_list&entity=warehouse_list`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getWarehouseListApi;
