import { z } from 'zod';

import { ROLES } from '@/core/constants/roles.constant';
import { FIRST_PAGE } from '@/shared/constants/pagination.constant';

import {
  ROLE_FILTER_VALUES,
  STATUS_FILTER_VALUES,
} from '../constants/user-management-filters.constant';

export const userManagementSearchSchema = z.object({
  page: z.coerce.number().int().positive().catch(FIRST_PAGE),
  search: z.string().catch(''),
  role: z.enum({ ...ROLE_FILTER_VALUES, ...ROLES }).catch(ROLE_FILTER_VALUES.ALL),
  isActive: z.enum(STATUS_FILTER_VALUES).catch(STATUS_FILTER_VALUES.ALL),
});
