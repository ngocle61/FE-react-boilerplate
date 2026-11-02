import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { beforeAll, describe, expect, it } from 'vitest';

import { HTTP_STATUS } from '@/core/constants/http.constant';
import { i18nReady } from '@/core/libs/i18n';
import {
  getErrorMessage,
  getFieldErrorMessages,
  getFieldOrErrorMessage,
  toHttpError,
} from '@/core/utils/http-error.util';

const config = { headers: {} } as InternalAxiosRequestConfig;

const toAxiosError = (status: number, data: unknown) =>
  new AxiosError('Request failed', AxiosError.ERR_BAD_REQUEST, config, null, {
    data,
    status,
    statusText: '',
    headers: {},
    config,
  } as AxiosResponse);

const validationError = toHttpError(
  toAxiosError(400, {
    code: 'validation_failed',
    message: 'validationFailed',
    errors: {
      password: [{ key: 'fieldTooShort', params: { minimum: 8 } }, { key: 'fieldInvalid' }],
      email: [{ key: 'fieldInvalidEmail' }],
    },
  }),
);

beforeAll(() => i18nReady);

describe('toHttpError', () => {
  it('keeps the message key sent by the API', () => {
    const error = toHttpError(
      toAxiosError(HTTP_STATUS.FORBIDDEN, { code: 'forbidden', message: 'forbidden' }),
    );

    expect(error).toMatchObject({ status: 403, code: 'forbidden', messageKey: 'forbidden' });
  });

  it('uses the network error key when no response arrived', () => {
    const error = toHttpError(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config));

    expect(error.messageKey).toBe('networkError');
  });

  it('uses the default key when the response has no error body', () => {
    expect(toHttpError(toAxiosError(502, '')).messageKey).toBe('internal');
  });
});

describe('getErrorMessage', () => {
  it('translates the message key sent by the API', () => {
    const error = toHttpError(
      toAxiosError(HTTP_STATUS.FORBIDDEN, {
        code: 'forbidden',
        message: 'forbiddenCalendarManage',
      }),
    );

    expect(getErrorMessage(error)).toBe(
      'You do not have permission to change interventions or clients.',
    );
  });

  it('shows the generic message for a key the FE does not know', () => {
    const error = toHttpError(toAxiosError(400, { code: 'bad_request', message: 'somethingNew' }));

    expect(getErrorMessage(error)).toBe('Something went wrong. Please try again.');
  });

  it('shows the generic message for errors that are not HTTP errors', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('Something went wrong. Please try again.');
  });
});

describe('getFieldErrorMessages', () => {
  it('translates the first issue of each field with its limits', () => {
    expect(getFieldErrorMessages(validationError)).toEqual({
      password: 'Enter at least 8 characters.',
      email: 'Enter a valid email address.',
    });
  });

  it('returns no messages for errors without field errors', () => {
    expect(getFieldErrorMessages(new Error('boom'))).toEqual({});
  });
});

describe('getFieldOrErrorMessage', () => {
  it('prefers the first field error', () => {
    expect(getFieldOrErrorMessage(validationError)).toBe('Enter at least 8 characters.');
  });

  it('falls back to the error message', () => {
    const error = toHttpError(toAxiosError(404, { code: 'not_found', message: 'userNotFound' }));

    expect(getFieldOrErrorMessage(error)).toBe('This user no longer exists.');
  });
});
