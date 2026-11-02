import { userManagementApi } from '@/core/apis/user-management.api';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserListResponseDto,
} from '@/core/types/user.dto';
import { toBooleanQueryParam } from '@/core/utils/query-param.util';

import type { UserListQueryParams } from '../types/user.type';

export const userManagementService = {
  list: async (params: UserListQueryParams, signal?: AbortSignal): Promise<UserListResponseDto> => {
    const { data } = await userManagementApi.list(
      { ...params, isActive: toBooleanQueryParam(params.isActive) },
      signal,
    );
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<void> => {
    await userManagementApi.create(payload);
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<void> => {
    await userManagementApi.update(id, payload);
  },
};
