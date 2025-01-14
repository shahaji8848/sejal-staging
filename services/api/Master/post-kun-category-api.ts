import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';
import { callPostAPI } from '../utils';

const postKunCategoryApi = async (
  get_access_token: any,
  name: any,
  type: any
) => {
  let response: any;

  const body = {
    version: 'v1',
    method: 'create_kundan_category',
    entity: 'kundan_category',
    name1: name,
    type: type,
  };

  const url: any = `${CONSTANTS.API_BASE_URL}/api/method/sj_antique.sdk.api`;

  response = await callPostAPI(url, body, get_access_token);
  return response;
};

export default postKunCategoryApi;
