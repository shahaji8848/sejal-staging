import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';
import { callGetAPI } from '../utils';

const getPurchasreceiptListApi = async (
  get_access_token: any,
  ready_receipt_type: string
) => {
  let method: any = 'get_specific_kundan_purchase_receipt';
  let entity: any = 'purchase_receipt';
  let custom_ready_receipt_type: any = ready_receipt_type;

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=${method}&entity=${entity}&custom_ready_receipt_type=${custom_ready_receipt_type}`;

  const response = await callGetAPI(url, get_access_token.token);
  return response;
};

export default getPurchasreceiptListApi;
