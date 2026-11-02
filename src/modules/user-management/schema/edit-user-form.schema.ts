import type { TFunction } from 'i18next';
import { z } from 'zod';

import type { I18N_NAMESPACES } from '@/core/constants/language.constant';

import { createUserFormSchema } from './create-user-form.schema';

export const editUserFormSchema = (t: TFunction<typeof I18N_NAMESPACES.USER_MANAGEMENT>) =>
  createUserFormSchema(t).pick({ fullName: true, role: true }).extend({ isActive: z.boolean() });
