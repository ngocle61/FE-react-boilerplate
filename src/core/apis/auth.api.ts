import { apiClient } from './api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zSignInResponse, zUserResponse } from '../contract/zod.gen';
import type { RefreshTokenPayload, SignInPayload, SignInResponseDto } from '../types/auth.dto';
import type { UserDto } from '../types/user.dto';

export const authApi = {
  signIn: (payload: SignInPayload) =>
    apiClient.post<SignInResponseDto>(API_ENDPOINTS.AUTH.SIGN_IN, payload, {
      responseSchema: zSignInResponse,
    }),

  signOut: (payload: RefreshTokenPayload) =>
    apiClient.post<void>(API_ENDPOINTS.AUTH.SIGN_OUT, payload),

  getMe: (signal?: AbortSignal) =>
    apiClient.get<UserDto>(API_ENDPOINTS.USERS.ME, { signal, responseSchema: zUserResponse }),
};
