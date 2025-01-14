import { CONSTANTS } from '@/services/config/api-config';
import { callPostAPI } from '../../utils';


const postSalesGroupApi = async (
    get_access_token: any,
    name: any
) => {
    let response: any;

    const body = {
        version: 'v1',
        method: 'create_sales_group',
        entity: 'sales_group',
        sales_group: name
    };

    const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

    response = await callPostAPI(url, body, get_access_token);
    return response;
};

export default postSalesGroupApi;
