import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const GetSpecificPurchaseReceiptData = async (request: any) => {
  const version = 'v1';
  const method = `${request?.query === "kundan" ? "get_name_specific_purchase_receipt" : "get_name_specific_purchase_receipt_return"}`
  const entity = `${request?.query === "kundan" ? "purchase_receipt" : "purchase_receipt_return"}`

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${request.name}`;

  const response = await callGetAPI(url, request.token);
  return response;
};

export default GetSpecificPurchaseReceiptData;
