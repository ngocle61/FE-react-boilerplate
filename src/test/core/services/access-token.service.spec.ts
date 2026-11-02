import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MISSING_REFRESH_TOKEN_ERROR } from '@/core/constants/session.constant';
import { accessTokenService } from '@/core/services/access-token.service';
import { useAuthStore } from '@/core/store/auth.store';
import type { TokenPairDto } from '@/core/types/auth.dto';

const NEXT_TOKENS: TokenPairDto = { accessToken: 'access-2', refreshToken: 'refresh-2' };

const resolveAfterTick = <TValue>(value: TValue) =>
  new Promise<TValue>((resolve) => setTimeout(() => resolve(value), 0));

describe('accessTokenService.refresh', () => {
  beforeEach(() => {
    useAuthStore.setState({ accessToken: 'access-1', refreshToken: 'refresh-1' });
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
