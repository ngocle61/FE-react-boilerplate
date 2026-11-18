import { AxiosError, type AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';

import { MISSING_REFRESH_TOKEN_ERROR } from '@/core/constants/session.constant';
import { isSessionRejectedError } from '@/core/utils/session.util';

const responseError = (status: number) =>
  new AxiosError('failed', AxiosError.ERR_BAD_RESPONSE, undefined, null, {
    status,
  } as AxiosResponse);

describe('isSessionRejectedError', () => {
  it.each([401, 403])('is true for a %i from the server', (status) => {
    expect(isSessionRejectedError(responseError(status))).toBe(true);
  });

  it('is true when no refresh token is stored', () => {
    expect(isSessionRejectedError(new Error(MISSING_REFRESH_TOKEN_ERROR))).toBe(true);
  });

  it.each([400, 429, 500, 503])('is false for a %i from the server', (status) => {
    expect(isSessionRejectedError(responseError(status))).toBe(false);
  });

  it('is false for an error with no response', () => {
    expect(isSessionRejectedError(new AxiosError('Network Error', AxiosError.ERR_NETWORK))).toBe(
      false,
    );
  });

  it('is false for any other error', () => {
    expect(isSessionRejectedError(new Error('boom'))).toBe(false);
    expect(isSessionRejectedError(null)).toBe(false);
  });
});
