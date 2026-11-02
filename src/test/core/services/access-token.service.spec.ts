import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  MISSING_REFRESH_TOKEN_ERROR,
  SESSION_CHANGED_ERROR,
  SESSION_END_REASONS,
  TOKEN_REFRESH_LOCK,
  TOKEN_REFRESH_TIMEOUT_MS,
} from '@/core/constants/session.constant';
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constant';
import { accessTokenService } from '@/core/services/access-token.service';
import { useAuthStore } from '@/core/store/auth.store';
import type { TokenPairDto } from '@/core/types/auth.dto';

const NEXT_TOKENS: TokenPairDto = { accessToken: 'access-2', refreshToken: 'refresh-2' };

const resolveAfterTick = <TValue>(value: TValue) =>
  new Promise<TValue>((resolve) => setTimeout(() => resolve(value), 0));

const storeFromOtherTab = (tokens: TokenPairDto) =>
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ state: tokens, version: 0 }));

describe('accessTokenService.refresh', () => {
  beforeEach(() => {
    useAuthStore.setState({ accessToken: 'access-1', refreshToken: 'refresh-1' });
  });

  afterEach(() => {
    Reflect.deleteProperty(navigator, 'locks');
  });

  it('gives up on a refresh that never answers', async () => {
    const post = vi.spyOn(axios, 'post').mockResolvedValue({ data: NEXT_TOKENS });

    await accessTokenService.refresh();

    expect(post.mock.calls[0]?.[2]).toEqual({ timeout: TOKEN_REFRESH_TIMEOUT_MS });
  });

  it('uses the tokens another tab already refreshed instead of the revoked one', async () => {
    storeFromOtherTab(NEXT_TOKENS);
    const post = vi.spyOn(axios, 'post');

    await expect(accessTokenService.refresh()).resolves.toBe(NEXT_TOKENS.accessToken);

    expect(post).not.toHaveBeenCalled();
    expect(useAuthStore.getState()).toMatchObject(NEXT_TOKENS);
  });

  it('waits for the tab holding the refresh lock and reuses its tokens', async () => {
    const post = vi.spyOn(axios, 'post');
    const request = vi.fn((_name: string, task: () => Promise<string>) => {
      storeFromOtherTab(NEXT_TOKENS);
      return task();
    });
    Object.defineProperty(navigator, 'locks', { configurable: true, value: { request } });

    await expect(accessTokenService.refresh()).resolves.toBe(NEXT_TOKENS.accessToken);

    expect(request).toHaveBeenCalledWith(TOKEN_REFRESH_LOCK, expect.any(Function));
    expect(post).not.toHaveBeenCalled();
  });

  it('drops the new tokens when the user signs out during the refresh', async () => {
    let answer: (value: unknown) => void = () => undefined;
    const post = vi.spyOn(axios, 'post').mockReturnValue(
      new Promise((resolve) => {
        answer = resolve;
      }),
    );

    const refresh = accessTokenService.refresh();
    await vi.waitFor(() => expect(post).toHaveBeenCalled());
    useAuthStore.getState().actions.endSession(SESSION_END_REASONS.SIGN_OUT);
    answer({ data: NEXT_TOKENS });

    await expect(refresh).rejects.toThrow(SESSION_CHANGED_ERROR);
    expect(useAuthStore.getState()).toMatchObject({ accessToken: null, refreshToken: null });
  });

  it('shares one refresh request between concurrent callers', async () => {
    const post = vi
      .spyOn(axios, 'post')
      .mockImplementation(() => resolveAfterTick({ data: NEXT_TOKENS }));

    const tokens = await Promise.all([accessTokenService.refresh(), accessTokenService.refresh()]);

    expect(tokens).toEqual([NEXT_TOKENS.accessToken, NEXT_TOKENS.accessToken]);
    expect(post).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState()).toMatchObject(NEXT_TOKENS);
  });

  it('starts a new request once the previous refresh settled', async () => {
    const post = vi.spyOn(axios, 'post').mockResolvedValue({ data: NEXT_TOKENS });

    await accessTokenService.refresh();
    await accessTokenService.refresh();

    expect(post).toHaveBeenCalledTimes(2);
  });

  it('rejects without calling the API when no refresh token is stored', async () => {
    useAuthStore.setState({ refreshToken: null });
    const post = vi.spyOn(axios, 'post');

    await expect(accessTokenService.refresh()).rejects.toThrow(MISSING_REFRESH_TOKEN_ERROR);
    expect(post).not.toHaveBeenCalled();
  });
});
