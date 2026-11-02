import type { z } from 'zod';

import type { Role } from '@/core/types/access.type';

import type { createSignInSchema } from '../schema/sign-in.schema';

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;

export interface DemoAccount {
  role: Role;
  email: string;
  password: string;
}
