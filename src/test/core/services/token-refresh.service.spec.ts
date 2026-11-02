import { AxiosError, type AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HTTP_STATUS } from '@/core/constants/http.constant';
import {
  MISSING_REFRESH_TOKEN_ERROR,
  SESSION_CHANGED_ERROR,
  SESSION_END_REASONS,
} from '@/core/constants/session.constant';
import { tokenRefreshService } from '@/core/services/token-refresh.service';

const { read, refresh, end } = vi.hoisted(() => ({
  read: vi.fn<() => Nullable<string>>(),
  refresh: vi.fn<() => Promise<string>>(),
  end: vi.fn(),
}));

vi.mock('@/core/services/access-token.service', () => ({ accessTokenService: { read, refresh } }));
vi.mock('@/core/services/session.service', () => ({ sessionService: { end } }));

const responseError = (status: number) =>
  new AxiosError('failed', AxiosError.ERR_BAD_RESPONSE, undefined, null, {
    status,
  } as AxiosResponse);

describe('tokenRefreshService.refreshOrEndSession', () => {
  beforeEach(() => {
    read.mockReset().mockReturnValue('access-token');
    refresh.mockReset();
    end.mockReset();
  });

  it('returns the new access token and keeps the session', async () => {
    refresh.mockResolvedValue('fresh-token');

    await expect(tokenRefreshService.refreshOrEndSession()).resolves.toBe('fresh-token');
    expect(end).not.toHaveBeenCalled();
  });

  it.each([
    ['a 401', responseError(HTTP_STATUS.UNAUTHORIZED)],
    ['a 403', responseError(HTTP_STATUS.FORBIDDEN)],
    ['a missing refresh token', new Error(MISSING_REFRESH_TOKEN_ERROR)],
  ])('ends the session as expired and rethrows on %s', async (_label, failure) => {
    refresh.mockRejectedValue(failure);

    await expect(tokenRefreshService.refreshOrEndSession()).rejects.toBe(failure);
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });

  it.each([
    ['a 503', responseError(503)],
    ['a network error', new AxiosError('Network Error', AxiosError.ERR_NETWORK)],
    ['a session that changed during the refresh', new Error(SESSION_CHANGED_ERROR)],
  ])('keeps the session and rethrows on %s', async (_label, failure) => {
    refresh.mockRejectedValue(failure);

    await expect(tokenRefreshService.refreshOrEndSession()).rejects.toBe(failure);
    expect(end).not.toHaveBeenCalled();
  });

  it('does not overwrite the end reason of a session that already ended', async () => {
    read.mockReturnValue(null);
    refresh.mockRejectedValue(new Error(MISSING_REFRESH_TOKEN_ERROR));

    await expect(tokenRefreshService.refreshOrEndSession()).rejects.toThrow();
    expect(end).not.toHaveBeenCalled();
  });
});
