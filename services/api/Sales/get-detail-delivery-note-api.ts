import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const GetDetailOfDeliveryNoteAPi = async (request: any) => {
  const version = 'v1';
  const method = 'get_specific_delivery_note';
  const entity = 'sales';

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

  const response = await callGetAPI(url, request.token);
  return response;
};

export default GetDetailOfDeliveryNoteAPi;
