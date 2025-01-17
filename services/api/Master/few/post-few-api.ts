import { CONSTANTS } from '@/services/config/api-config';
import { callPostAPI } from '../../utils';

const postFewApi = async (
    get_access_token: any,
    values: any
) => {
    let response: any;

    const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

    response = await callPostAPI(url, values, get_access_token);
    return response;
};

export default postFewApi;
