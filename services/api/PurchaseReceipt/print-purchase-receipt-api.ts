import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const PrintPurchaseReceiptApi = async (token: any, name: any) => {
  const version = 'v1';
  const method = 'get_print_purchase_receipt';
  const entity = 'print_purchase_receipt';

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${name}`;

  const response = await callGetAPI(url, token);
  return response.data.message;
};

export default PrintPurchaseReceiptApi;
