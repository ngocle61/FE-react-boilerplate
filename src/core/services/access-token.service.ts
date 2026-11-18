import axios from 'axios';

import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { ENV } from '../constants/env.constant';
import {
  MISSING_REFRESH_TOKEN_ERROR,
  SESSION_CHANGED_ERROR,
  TOKEN_REFRESH_LOCK,
  TOKEN_REFRESH_TIMEOUT_MS,
} from '../constants/session.constant';
import { zTokenPair } from '../contract/zod.gen';
import { useAuthStore } from '../store/auth.store';
import type { RefreshTokenPayload } from '../types/auth.dto';
import { parseContract } from '../utils/contract.util';
import { runWithWebLock } from '../utils/web-lock.util';

let pendingRefresh: Nullable<Promise<string>> = null;

const requestNewTokens = async (staleAccessToken: Nullable<string>): Promise<string> => {
  await useAuthStore.persist.rehydrate();

  const { accessToken, refreshToken, actions } = useAuthStore.getState();
  if (accessToken && accessToken !== staleAccessToken) return accessToken;
  if (!refreshToken) throw new Error(MISSING_REFRESH_TOKEN_ERROR);

  const { data, status } = await axios.post<unknown>(
    `${ENV.API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
    { refreshToken } satisfies RefreshTokenPayload,
    { timeout: TOKEN_REFRESH_TIMEOUT_MS },
  );

  const tokens = parseContract(zTokenPair, data, status);
  if (useAuthStore.getState().refreshToken !== refreshToken) {
    throw new Error(SESSION_CHANGED_ERROR);
  }

  actions.updateTokens(tokens);
  return tokens.accessToken;
};

export const accessTokenService = {
  read: (): Nullable<string> => useAuthStore.getState().accessToken,

  refresh: (): Promise<string> => {
    const staleAccessToken = useAuthStore.getState().accessToken;

    pendingRefresh ??= runWithWebLock(TOKEN_REFRESH_LOCK, () =>
      requestNewTokens(staleAccessToken),
    ).finally(() => {
      pendingRefresh = null;
    });
    return pendingRefresh;
  },
};
