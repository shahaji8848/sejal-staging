import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const GetSpecificPurchaseReceiptData = async (request: any) => {
  const version = 'v1';
  const method = 'get_name_specific_purchase_receipt';
  const entity = 'purchase_receipt';

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

  const response = await callGetAPI(url, request.token);
  return response;
};

export default GetSpecificPurchaseReceiptData;
