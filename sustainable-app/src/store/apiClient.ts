import axios from 'axios';
import { EnhancedStore } from '@reduxjs/toolkit';
import { CORE_API_URL } from '@env';
import qs from 'qs';

let store: EnhancedStore;

export const injectStore = (_store: EnhancedStore) => {
  store = _store;
};

const coreClient = axios.create({
  baseURL: CORE_API_URL,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
      arrayFormat: 'brackets',
    }),
});

coreClient.interceptors.request.use((config) => {
  const state = store.getState();
  if (state.auth.accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${state.auth.accessToken}`,
    };
  }
  return config;
});

export { coreClient };
