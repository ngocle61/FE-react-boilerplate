import type { UserManagementFilterValues } from '../types/user-management-filters.type';

export const ROLE_FILTER_VALUES = {
  ALL: 'ALL',
} as const;

export const STATUS_FILTER_VALUES = {
  ALL: 'ALL',
  ACTIVE: 'true',
  INACTIVE: 'false',
} as const;

export const USER_MANAGEMENT_FILTERS_DEFAULT_VALUES: UserManagementFilterValues = {
  search: '',
  role: ROLE_FILTER_VALUES.ALL,
  isActive: STATUS_FILTER_VALUES.ALL,
};

export const USER_MANAGEMENT_FILTER_FIELDS = [
  'role',
  'isActive',
] as const satisfies readonly (keyof UserManagementFilterValues)[];
