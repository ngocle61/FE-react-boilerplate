import { AxiosError } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { streamClient } from '@/core/apis/stream-client';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '@/core/constants/http.constant';
import {
  MISSING_REFRESH_TOKEN_ERROR,
  SESSION_END_REASONS,
} from '@/core/constants/session.constant';
import { HttpError } from '@/core/utils/http-error.util';

const { read, refresh, end } = vi.hoisted(() => ({
  read: vi.fn<() => Nullable<string>>(),
  refresh: vi.fn<() => Promise<string>>(),
  end: vi.fn(),
}));

vi.mock('@/core/services/access-token.service', () => ({ accessTokenService: { read, refresh } }));
vi.mock('@/core/services/session.service', () => ({ sessionService: { end } }));

const STREAM_PATH = '/chat/messages/stream';
const FRESH_TOKEN = 'fresh-token';

const fetchMock = vi.fn<typeof fetch>();

const streamResponse = () => new Response('event: done\ndata: {}\n\n', { status: 200 });

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status });

const authorizationOf = (call: number) =>
  new Headers(fetchMock.mock.calls[call]?.[1]?.headers).get(AUTHORIZATION_HEADER);

const post = () => streamClient.post(STREAM_PATH, { content: 'Hi' }, new AbortController().signal);

const captureError = (promise: Promise<unknown>) => promise.catch((reason: unknown) => reason);

describe('streamClient.post', () => {
  beforeEach(() => {
    read.mockReset().mockReturnValue('stale-token');
    refresh.mockReset().mockResolvedValue(FRESH_TOKEN);
    end.mockReset();
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the bearer token and returns the event stream', async () => {
    fetchMock.mockResolvedValue(streamResponse());

    await expect(post()).resolves.toBeInstanceOf(ReadableStream);
    expect(authorizationOf(0)).toBe('Bearer stale-token');
    expect(refresh).not.toHaveBeenCalled();
  });

  it('refreshes once on 401 and retries with the new token', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse(HTTP_STATUS.UNAUTHORIZED, {}))
      .mockResolvedValueOnce(streamResponse());

    await expect(post()).resolves.toBeInstanceOf(ReadableStream);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(authorizationOf(1)).toBe(`Bearer ${FRESH_TOKEN}`);
    expect(end).not.toHaveBeenCalled();
  });

  it('ends the session when the retried stream is still unauthorized', async () => {
    fetchMock.mockImplementation(() =>
      Promise.resolve(jsonResponse(HTTP_STATUS.UNAUTHORIZED, { message: 'unauthorized' })),
    );

    const error = await captureError(post());

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ status: HTTP_STATUS.UNAUTHORIZED, messageKey: 'unauthorized' });
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });

  it('ends the session and raises an HttpError when the refresh token is rejected', async () => {
    fetchMock.mockResolvedValue(jsonResponse(HTTP_STATUS.UNAUTHORIZED, {}));
    refresh.mockRejectedValue(new Error(MISSING_REFRESH_TOKEN_ERROR));

    const error = await captureError(post());

    expect(error).toBeInstanceOf(HttpError);
    expect(end).toHaveBeenCalledWith(SESSION_END_REASONS.EXPIRED);
  });

  it('keeps the session and raises an HttpError when the refresh has no network', async () => {
    fetchMock.mockResolvedValue(jsonResponse(HTTP_STATUS.UNAUTHORIZED, {}));
    refresh.mockRejectedValue(new AxiosError('Network Error', AxiosError.ERR_NETWORK));

    const error = await captureError(post());

    expect(error).toBeInstanceOf(HttpError);
    expect(end).not.toHaveBeenCalled();
  });

  it('raises the error body the server sent', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(503, { code: 'ai_not_configured', message: 'aiNotConfigured' }),
    );

    const error = await captureError(post());

    expect(error).toMatchObject({
      status: 503,
      code: 'ai_not_configured',
      messageKey: 'aiNotConfigured',
    });
  });
});
