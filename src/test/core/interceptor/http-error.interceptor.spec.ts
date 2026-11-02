import axios, { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import { describe, expect, it } from 'vitest';

import {
  DEFAULT_ERROR_MESSAGE_KEY,
  HTTP_STATUS,
  NETWORK_ERROR_MESSAGE_KEY,
} from '@/core/constants/http.constant';
import { setupHttpErrorInterceptor } from '@/core/interceptor/http-error.interceptor';
import { HttpError } from '@/core/utils/http-error.util';

const FIELD_ERRORS = { email: [{ key: 'fieldInvalidEmail' }] };

const createClient = (adapter: AxiosAdapter) => {
  const client = axios.create({ adapter });
  setupHttpErrorInterceptor(client);
  return client;
};

const captureError = (promise: Promise<unknown>) => promise.catch((reason: unknown) => reason);

const rejectWithResponse =
  (status: number, data: unknown): AxiosAdapter =>
  (config: InternalAxiosRequestConfig) =>
    Promise.reject(
      new AxiosError('failed', AxiosError.ERR_BAD_REQUEST, config, null, {
        data,
        status,
        statusText: '',
        headers: {},
        config,
      }),
    );

describe('setupHttpErrorInterceptor', () => {
  it('turns a server error into an HttpError carrying its body', async () => {
    const client = createClient(
      rejectWithResponse(HTTP_STATUS.NOT_FOUND, {
        code: 'not_found',
        message: 'notFound',
        errors: FIELD_ERRORS,
      }),
    );

    const error = await captureError(client.get('/users/missing'));

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({
      status: HTTP_STATUS.NOT_FOUND,
      code: 'not_found',
      messageKey: 'notFound',
      fieldErrors: FIELD_ERRORS,
    });
  });

  it('falls back to the default message when the body has none', async () => {
    const client = createClient(rejectWithResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, ''));

    const error = await captureError(client.get('/users'));

    expect(error).toMatchObject({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      messageKey: DEFAULT_ERROR_MESSAGE_KEY,
    });
  });

  it('reports a request that never got a response as a network error', async () => {
    const client = createClient((config) =>
      Promise.reject(new AxiosError('offline', AxiosError.ERR_NETWORK, config)),
    );

    const error = await captureError(client.get('/users'));

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ status: undefined, messageKey: NETWORK_ERROR_MESSAGE_KEY });
  });
});
