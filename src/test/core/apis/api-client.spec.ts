import { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { apiClient } from '@/core/apis/api-client';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '@/core/constants/http.constant';

const { read, refresh, end } = vi.hoisted(() => ({
  read: vi.fn<() => Nullable<string>>(),
  refresh: vi.fn<() => Promise<string>>(),
  end: vi.fn(),
}));

vi.mock('@/core/services/access-token.service', () => ({ accessTokenService: { read, refresh } }));
vi.mock('@/core/services/session.service', () => ({ sessionService: { end } }));

const STALE_TOKEN = 'stale-token';
const FRESH_TOKEN = 'fresh-token';

const zCountLabel = z.object({ count: z.number() }).transform(({ count }) => ({
  label: String(count),
}));

const respondWithFreshTokenOnly: AxiosAdapter = (config: InternalAxiosRequestConfig) => {
  if (config.headers.get(AUTHORIZATION_HEADER) === `Bearer ${FRESH_TOKEN}`) {
    return Promise.resolve({
      data: { count: 3 },
      status: 200,
      statusText: '',
      headers: {},
      config,
    });
  }
  return Promise.reject(
    new AxiosError('unauthorized', AxiosError.ERR_BAD_REQUEST, config, null, {
      data: { message: 'unauthorized' },
      status: HTTP_STATUS.UNAUTHORIZED,
      statusText: '',
      headers: {},
      config,
    }),
  );
};

describe('apiClient', () => {
  beforeEach(() => {
    read.mockReset().mockReturnValue(STALE_TOKEN);
    refresh.mockReset().mockImplementation(() => {
      read.mockReturnValue(FRESH_TOKEN);
      return Promise.resolve(FRESH_TOKEN);
    });
  });

  it('parses a response replayed after a token refresh against its contract once', async () => {
    const response = await apiClient.get('/interventions', {
      adapter: respondWithFreshTokenOnly,
      responseSchema: zCountLabel,
    });

    expect(response.data).toEqual({ label: '3' });
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
