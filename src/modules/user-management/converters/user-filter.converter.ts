import { USER_MANAGEMENT_PAGE_SIZE } from '../constants/pagination.constant';
import {
  ROLE_FILTER_VALUES,
  STATUS_FILTER_VALUES,
} from '../constants/user-management-filters.constant';
import type {
  UserManagementFilterValues,
  UserManagementSearchState,
} from '../types/user-management-filters.type';
import type { UserListFilterParams, UserListQueryParams } from '../types/user.type';

export const userFilterConverter = {
  toFormValues: ({
    search,
    role,
    isActive,
  }: UserManagementSearchState): UserManagementFilterValues => ({
    search,
    role,
    isActive,
  }),

  toQueryParams: (filters: UserManagementFilterValues): UserListFilterParams => ({
    search: filters.search.trim() || undefined,
    role: filters.role === ROLE_FILTER_VALUES.ALL ? undefined : filters.role,
    isActive:
      filters.isActive === STATUS_FILTER_VALUES.ALL
        ? undefined
        : filters.isActive === STATUS_FILTER_VALUES.ACTIVE,
  }),

  toListParams: (state: UserManagementSearchState): UserListQueryParams => ({
    ...userFilterConverter.toQueryParams(state),
    page: state.page,
    pageSize: USER_MANAGEMENT_PAGE_SIZE,
  }),
};
