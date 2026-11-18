import type { AxiosInstance } from 'axios';

import { toHttpError } from '../utils/http-error.util';

export const setupHttpErrorInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(undefined, (error: unknown) =>
    Promise.reject(toHttpError(error)),
  );
};
