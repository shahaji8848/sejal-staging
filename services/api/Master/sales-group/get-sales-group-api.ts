import { CONSTANTS } from '../../../config/api-config';
import { callGetAPI } from '../../utils';

const getSalesGroupApi = async (get_access_token: any) => {
    let url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api?version=v1&method=get_sales_group&entity=sales_group`;

    const response = await callGetAPI(url, get_access_token);
    return response;
};

export default getSalesGroupApi;
