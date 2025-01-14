import { CONSTANTS } from '../config/api-config';
import { callGetAPI } from './utils';

const getPurchasreceiptListApi = async (
  get_access_token: any,
  ready_receipt_type: string,
  param?: any
) => {
  let method: any = 'get_specific_purchase_receipt';
  let entity: any = 'specific_purchase_receipt';
  let custom_ready_receipt_type: any = ready_receipt_type;

  const params = `version=v1&method=${
    param?.method ? param.method : method
  }&entity=${
    param?.entity ? param?.entity : entity
  }&custom_ready_receipt_type=${custom_ready_receipt_type}`;

  let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?${params}`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getPurchasreceiptListApi;
