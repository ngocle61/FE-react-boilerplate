import axios, { type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { CONTRACT_MISMATCH_ERROR_CODE, HTTP_STATUS } from '@/core/constants/http.constant';
import { setupHttpErrorInterceptor } from '@/core/interceptor/http-error.interceptor';
import { setupResponseContractInterceptor } from '@/core/interceptor/response-contract.interceptor';
import { HttpError } from '@/core/utils/http-error.util';

const userSchema = z.object({ id: z.string(), createdAt: z.iso.datetime() });

const respondWith =
  (data: unknown): AxiosAdapter =>
  (config: InternalAxiosRequestConfig) =>
    Promise.resolve({ data, status: HTTP_STATUS.OK, statusText: '', headers: {}, config });

const createClient = (adapter: AxiosAdapter) => {
  const client = axios.create({ adapter });
  setupResponseContractInterceptor(client);
  setupHttpErrorInterceptor(client);
  return client;
};

describe('setupResponseContractInterceptor', () => {
  it('returns the parsed body and drops fields the contract does not declare', async () => {
    const client = createClient(
      respondWith({ id: 'user-1', createdAt: '2026-01-01T00:00:00.000Z', extra: true }),
    );

    const { data } = await client.get<unknown>('/users/me', { responseSchema: userSchema });

    expect(data).toEqual({ id: 'user-1', createdAt: '2026-01-01T00:00:00.000Z' });
  });

  it('leaves responses without a schema untouched', async () => {
    const body = { anything: true };
    const client = createClient(respondWith(body));

    const { data } = await client.get<unknown>('/health');

    expect(data).toBe(body);
  });

  it('rejects a body that breaks the contract with a non-retryable contract error', async () => {
    const client = createClient(respondWith({ id: 1, createdAt: 'yesterday' }));

    const error: unknown = await client
      .get('/users/me', { responseSchema: userSchema })
      .catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ code: CONTRACT_MISMATCH_ERROR_CODE, status: HTTP_STATUS.OK });
    expect((error as HttpError).cause).toBeInstanceOf(z.ZodError);
  });
});
