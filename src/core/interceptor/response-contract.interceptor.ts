import type { AxiosInstance } from 'axios';

import { parseContract } from '../utils/contract.util';

export const setupResponseContractInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use((response) => {
    const { responseSchema } = response.config;
    if (!responseSchema) return response;

    return { ...response, data: parseContract(responseSchema, response.data, response.status) };
  });
};
