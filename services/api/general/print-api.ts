import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const PrintApi = async (request: any) => {
  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${request.version}&method=${request.method}&entity=${request.entity}&name=${request.name}`;

  const response = await callGetAPI(url, request.token);
  return response;
};

export default PrintApi;
