import axios from 'axios';

import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { ENV } from '../constants/env.constant';
import { MISSING_REFRESH_TOKEN_ERROR } from '../constants/session.constant';
import { zTokenPair } from '../contract/zod.gen';
import { useAuthStore } from '../store/auth.store';
import type { RefreshTokenPayload } from '../types/auth.dto';
import { parseContract } from '../utils/contract.util';

let pendingRefresh: Nullable<Promise<string>> = null;

const requestNewTokens = async (): Promise<string> => {
  const { refreshToken, actions } = useAuthStore.getState();
  if (!refreshToken) throw new Error(MISSING_REFRESH_TOKEN_ERROR);

  const { data, status } = await axios.post<unknown>(
    `${ENV.API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
    { refreshToken } satisfies RefreshTokenPayload,
  );

  const tokens = parseContract(zTokenPair, data, status);
  actions.updateTokens(tokens);
  return tokens.accessToken;
};

export const accessTokenService = {
  read: (): Nullable<string> => useAuthStore.getState().accessToken,

  refresh: (): Promise<string> => {
    pendingRefresh ??= requestNewTokens().finally(() => {
      pendingRefresh = null;
    });
    return pendingRefresh;
  },
};
