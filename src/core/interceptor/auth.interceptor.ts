import { isAxiosError, type AxiosInstance } from 'axios';

import { PUBLIC_AUTH_ENDPOINTS } from '../constants/api-endpoints.constant';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '../constants/http.constant';
import { accessTokenService } from '../services/access-token.service';
import { tokenRefreshService } from '../services/token-refresh.service';
import { toBearerAuthorization } from '../utils/authorization.util';
import { isSessionRejectedError } from '../utils/session.util';

export const setupAuthInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use((config) => {
    const accessToken = accessTokenService.read();
    if (accessToken) config.headers.set(AUTHORIZATION_HEADER, toBearerAuthorization(accessToken));
    return config;
  });

  client.interceptors.response.use(undefined, async (error: unknown) => {
    if (!isAxiosError(error)) throw error;

    const request = error.config;
    const isUnauthorized = error.response?.status === HTTP_STATUS.UNAUTHORIZED;
    const isPublicEndpoint = PUBLIC_AUTH_ENDPOINTS.includes(request?.url ?? '');

    if (!request || !isUnauthorized || isPublicEndpoint) {
      return Promise.reject(error);
    }

    if (request._retry) {
      tokenRefreshService.endExpiredSession();
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      const accessToken = await tokenRefreshService.refreshOrEndSession();
      request.headers.set(AUTHORIZATION_HEADER, toBearerAuthorization(accessToken));
      return client.request(request);
    } catch (refreshError) {
      throw isSessionRejectedError(refreshError) ? error : refreshError;
    }
  });
};
