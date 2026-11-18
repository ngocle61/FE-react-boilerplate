import axios, { type AxiosInstance } from 'axios';

import { ENV } from '../constants/env.constant';
import { setupAuthInterceptor } from '../interceptor/auth.interceptor';
import { setupHttpErrorInterceptor } from '../interceptor/http-error.interceptor';
import { setupResponseContractInterceptor } from '../interceptor/response-contract.interceptor';

export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: { indexes: null },
});

setupResponseContractInterceptor(apiClient);
setupAuthInterceptor(apiClient);
setupHttpErrorInterceptor(apiClient);
