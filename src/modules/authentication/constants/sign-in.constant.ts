import { ROLES } from '@/core/constants/roles.constant';

import type { DemoAccount, SignInFormValues } from '../types/sign-in.type';

export const SIGN_IN_DEFAULT_VALUES: SignInFormValues = {
  email: '',
  password: '',
};

export const DEMO_PASSWORD = 'Password@123';

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  { role: ROLES.ADMIN, email: 'admin@example.com', password: DEMO_PASSWORD },
  { role: ROLES.MEMBER, email: 'member@example.com', password: DEMO_PASSWORD },
  { role: ROLES.VIEWER, email: 'viewer@example.com', password: DEMO_PASSWORD },
];
