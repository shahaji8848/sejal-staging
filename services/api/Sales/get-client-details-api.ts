import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getClientDetailsApi = async (get_access_token: any, client_name: any) => {
    let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_fetch_client_details&entity=client&client=${client_name}`;

    const response = await callGetAPI(url, get_access_token);
    return response;
};

export default getClientDetailsApi;
