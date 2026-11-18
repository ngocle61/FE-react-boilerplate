import { ENV } from '../constants/env.constant';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '../constants/http.constant';
import { accessTokenService } from '../services/access-token.service';
import { tokenRefreshService } from '../services/token-refresh.service';
import { toBearerAuthorization } from '../utils/authorization.util';
import { toHttpError, toNetworkHttpError, toResponseHttpError } from '../utils/http-error.util';

const requestStream = (
  path: string,
  body: unknown,
  signal: AbortSignal,
  accessToken: Nullable<string>,
): Promise<Response> =>
  fetch(`${ENV.API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      ...(accessToken && { [AUTHORIZATION_HEADER]: toBearerAuthorization(accessToken) }),
    },
    body: JSON.stringify(body),
    signal,
  });

const refreshAccessToken = (): Promise<string> =>
  tokenRefreshService
    .refreshOrEndSession()
    .catch((error: unknown) => Promise.reject(toHttpError(error)));

export const streamClient = {
  post: async (
    path: string,
    body: unknown,
    signal: AbortSignal,
  ): Promise<ReadableStream<BufferSource>> => {
    let response = await requestStream(path, body, signal, accessTokenService.read());

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      response = await requestStream(path, body, signal, await refreshAccessToken());
      if (response.status === HTTP_STATUS.UNAUTHORIZED) tokenRefreshService.endExpiredSession();
    }

    if (!response.ok) throw await toResponseHttpError(response);
    if (!response.body) throw toNetworkHttpError();

    return response.body;
  },
};
