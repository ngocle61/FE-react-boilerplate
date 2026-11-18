import type { z } from 'zod';

import type { Role } from '@/core/types/access.type';

import type {
  ROLE_FILTER_VALUES,
  STATUS_FILTER_VALUES,
} from '../constants/user-management-filters.constant';
import type { userManagementSearchSchema } from '../schema/user-management-search.schema';

export type RoleFilterValue = Role | (typeof ROLE_FILTER_VALUES)[keyof typeof ROLE_FILTER_VALUES];

export type StatusFilterValue = (typeof STATUS_FILTER_VALUES)[keyof typeof STATUS_FILTER_VALUES];

export interface UserManagementFilterValues {
  search: string;
  role: RoleFilterValue;
  isActive: StatusFilterValue;
}

export type UserManagementSearchState = z.infer<typeof userManagementSearchSchema>;
