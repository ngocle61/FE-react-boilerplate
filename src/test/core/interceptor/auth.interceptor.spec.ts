import axios, {
  AxiosError,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '@/core/constants/http.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { setupAuthInterceptor } from '@/core/interceptor/auth.interceptor';
import { setupHttpErrorInterceptor } from '@/core/interceptor/http-error.interceptor';
import { HttpError } from '@/core/utils/http-error.util';

const { read, refresh, end } = vi.hoisted(() => ({
  read: vi.fn<() => Nullable<string>>(),
  refresh: vi.fn<() => Promise<string>>(),
  end: vi.fn(),
}));

vi.mock('@/core/services/access-token.service', () => ({ accessTokenService: { read, refresh } }));
vi.mock('@/core/services/session.service', () => ({ sessionService: { end } }));

const STALE_TOKEN = 'stale-token';
const FRESH_TOKEN = 'fresh-token';
const PROTECTED_URL = '/interventions';

const toResponse = (
  config: InternalAxiosRequestConfig,
  status: number,
  data: unknown,
): AxiosResponse => ({ data, status, statusText: '', headers: {}, config });

const reject = (config: InternalAxiosRequestConfig, status: number, data: unknown) =>
  Promise.reject(
    new AxiosError(
      'failed',
      AxiosError.ERR_BAD_REQUEST,
      config,
      null,
      toResponse(config, status, data),
    ),
  );

const unauthorized = (config: InternalAxiosRequestConfig) =>
  reject(config, HTTP_STATUS.UNAUTHORIZED, { code: 'unauthorized', message: 'unauthorized' });

const hasFreshToken = (config: InternalAxiosRequestConfig) =>
  config.headers.get(AUTHORIZATION_HEADER) === `Bearer ${FRESH_TOKEN}`;

const createClient = (adapter: AxiosAdapter) => {
  const client = axios.create({ adapter });
  setupAuthInterceptor(client);
  setupHttpErrorInterceptor(client);
  return client;
};

const captureError = (promise: Promise<unknown>) => promise.catch((reason: unknown) => reason);

describe('setupAuthInterceptor', () => {
  beforeEach(() => {
    read.mockReset().mockReturnValue(STALE_TOKEN);
    refresh.mockReset().mockImplementation(() => {
      read.mockReturnValue(FRESH_TOKEN);
      return Promise.resolve(FRESH_TOKEN);
    });
    end.mockReset();
  });

  it('refreshes the token once and replays the request', async () => {
    const client = createClient(async (config) =>
      hasFreshToken(config) ? toResponse(config, 200, { ok: true }) : unauthorized(config),
    );

    const response = await client.get(PROTECTED_URL);

    expect(response.data).toEqual({ ok: true });
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(end).not.toHaveBeenCalled();
  });

  it('keeps the server error of the replayed request', async () => {
    const client = createClient(async (config) =>
      hasFreshToken(config)
        ? reject(config, 422, {
            code: 'validation_failed',
            message: 'validationFailed',
            errors: { name: [{ key: 'fieldRequired' }] },
          })
        : unauthorized(config),
    );

    const error = await captureError(client.get(PROTECTED_URL));

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({
      status: 422,
      code: 'validation_failed',
      messageKey: 'validationFailed',
      fieldErrors: { name: [{ key: 'fieldRequired' }] },
    });
    expect(end).not.toHaveBeenCalled();
  });

  it('ends the session when the refreshed token is rejected as well', async () => {
    const client = createClient(async (config) => unauthorized(config));

    const error = await captureError(client.get(PROTECTED_URL));

    expect(error).toBeInstanceOf(HttpError);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });

  it('ends the session when the token cannot be refreshed', async () => {
    refresh.mockRejectedValue(new Error('refresh failed'));
    const client = createClient(async (config) => unauthorized(config));

    const error = await captureError(client.get(PROTECTED_URL));

    expect(error).toMatchObject({ status: HTTP_STATUS.UNAUTHORIZED, messageKey: 'unauthorized' });
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });

  it('leaves a rejected sign-in alone', async () => {
    const client = createClient(async (config) =>
      reject(config, HTTP_STATUS.UNAUTHORIZED, {
        code: 'invalid_credentials',
        message: 'invalidCredentials',
      }),
    );

    const error = await captureError(client.post(API_ENDPOINTS.AUTH.SIGN_IN, {}));

    expect(error).toMatchObject({ messageKey: 'invalidCredentials' });
    expect(refresh).not.toHaveBeenCalled();
    expect(end).not.toHaveBeenCalled();
  });
});
