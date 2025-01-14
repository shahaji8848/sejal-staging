import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';

const DeleteApi = async (
  token: any,
  version: any,
  method: any,
  entity: any,
  name: any
) => {
  let response: any;

  const params = `/api/method/sj_antique.sdk.api?version=${version}&method=${method}&entity=${entity}&name=${name}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios
    .delete(`${CONSTANTS.API_BASE_URL}${params}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
    });
  return response;
};

export default DeleteApi;
