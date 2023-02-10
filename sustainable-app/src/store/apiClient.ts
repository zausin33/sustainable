import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { CORE_API_URL } from '@env';
import qs from 'qs';
import {endRequestSuccessful, endRequestWithError, setIsLoading, startRequest} from "./status/status.slice";

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

const coreClient = axios.create({
  baseURL: CORE_API_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
      arrayFormat: 'brackets',
    })
  }
});

coreClient.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.users.current?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${state.users.current.token}`,
    };
  }
  store.dispatch(startRequest());
  return config;
}, error => {
  console.log("request error", error.message, error.request?.data)
  store.dispatch(endRequestWithError({error}));
});


coreClient.interceptors.response.use(function (response) {
  store.dispatch(endRequestSuccessful())
  return response;
}, function (error) {
  console.log("api error", error.message, error.response?.data)
  store.dispatch(endRequestWithError({error: error.response?.data}));
  return Promise.reject(error);
});

export { coreClient };
