import axios from 'axios';
import { headerGenerator } from '../config/api-config';
import { handleApiError } from './general/error-handler';

export const callGetAPI = async (url: string, token: any) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .get(`${url}`, {
      ...getHeaders,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err);
    });

  return response;
};

export const callPostAPI = async (url: string, body: any, token: any) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .post(`${url}`, body, {
      ...getHeaders,
      timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err);
    });

  return response;
};

export const callPutAPI = async (url: string, body: any, token: any) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .put(`${url}`, body, {
      ...getHeaders,
      // timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err);
    });

  return response;
};

export const callDeleteAPI = async (url: string, token: any) => {
  let response: any;
  const getHeaders = headerGenerator(token);
  await axios
    .delete(`${url}`, {
      ...getHeaders,
      // timeout: 5000,
    })
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err);
    });

  return response;
};
