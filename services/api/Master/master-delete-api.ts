import { CONSTANTS } from '@/services/config/api-config';
import { callDeleteAPI } from '../utils';

const MasterDeleteApi = async (token: any, doctype: any, name: any) => {
  let response: any;

  const url = `${CONSTANTS.API_BASE_URL}/api/resource/${doctype}/${name}`;

  response = await callDeleteAPI(url, token);
  return response;
};

export default MasterDeleteApi;
