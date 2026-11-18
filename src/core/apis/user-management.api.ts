import { apiClient } from './api-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zUserListResponse } from '../contract/zod.gen';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserListRequestParams,
  UserListResponseDto,
} from '../types/user.dto';

export const userManagementApi = {
  list: (params: UserListRequestParams, signal?: AbortSignal) =>
    apiClient.get<UserListResponseDto>(API_ENDPOINTS.USERS.BASE, {
      params,
      signal,
      responseSchema: zUserListResponse,
    }),

  create: (payload: CreateUserPayload) => apiClient.post<void>(API_ENDPOINTS.USERS.BASE, payload),

  update: (id: string, payload: UpdateUserPayload) =>
    apiClient.patch<void>(API_ENDPOINTS.USERS.DETAIL(id), payload),
};
