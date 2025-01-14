import { CONSTANTS } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getKarigarClientApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&entity=barcode&method=get_karigar_and_client_name`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getKarigarClientApi;
