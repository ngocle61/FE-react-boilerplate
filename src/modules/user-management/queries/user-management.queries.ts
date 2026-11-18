import { queryOptions } from '@tanstack/react-query';

import { QUERY_SCOPES } from '@/core/constants/query-keys.constant';

import { USER_MANAGEMENT_QUERY_KEYS } from '../constants/query-keys.constant';
import { userManagementService } from '../services/user-management.service';
import type { UserListQueryParams } from '../types/user.type';

export const userManagementQueries = {
  all: () => [USER_MANAGEMENT_QUERY_KEYS.USERS],

  list: (params: UserListQueryParams) =>
    queryOptions({
      queryKey: [USER_MANAGEMENT_QUERY_KEYS.USERS, QUERY_SCOPES.LIST, params],
      queryFn: ({ signal }) => userManagementService.list(params, signal),
    }),
};
