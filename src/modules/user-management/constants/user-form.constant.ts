import { ROLES } from '@/core/constants/roles.constant';

import type { CreateUserFormValues } from '../types/user-form.type';

export const CREATE_USER_DEFAULT_VALUES: CreateUserFormValues = {
  email: '',
  fullName: '',
  password: '',
  role: ROLES.VIEWER,
};
