import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../../utils';

const getItemDetailsPurchaseReturnApi = async (get_access_token: any, product_code: any) => {
    let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_item_specific_purchase_return&entity=purchase_receipt_return&name=${product_code}`;
    const response = await callGetAPI(url, get_access_token);
    return response;
}

export default getItemDetailsPurchaseReturnApi;