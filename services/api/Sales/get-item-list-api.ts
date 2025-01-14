import { CONSTANTS } from '@/services/config/api-config';
import { callGetAPI } from '../utils';

const getItemListInSalesApi = async (get_access_token: any) => {
  let url: any = `${CONSTANTS.API_BASE_URL}/api/resource/Item?fields=[%22name%22]&limit_page_length=["*"]`;

  const response = await callGetAPI(url, get_access_token);
  return response;
};

export default getItemListInSalesApi;
