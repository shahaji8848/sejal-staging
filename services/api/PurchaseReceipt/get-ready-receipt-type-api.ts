import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getReadyReceiptTypeData = async (request: any) => {
    const version = 'v1';
    const method = 'get_ready_receipt_type';
    const entity = 'purchase_receipt';

    const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}`;

    const response = await callGetAPI(url, request.token);
    return response;
};

export default getReadyReceiptTypeData;
