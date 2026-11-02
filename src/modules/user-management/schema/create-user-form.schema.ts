import type { TFunction } from 'i18next';
import { z } from 'zod';

import type { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { ROLES } from '@/core/constants/roles.constant';

import { USER_FORM_LIMITS } from '../constants/user-form-limits.constant';

export const createUserFormSchema = (t: TFunction<typeof I18N_NAMESPACES.USER_MANAGEMENT>) =>
  z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { error: t('form.validation.emailRequired') })
      .pipe(z.email({ error: t('form.validation.emailInvalid') })),
    fullName: z
      .string()
      .trim()
      .min(1, { error: t('form.validation.fullNameRequired') })
      .max(USER_FORM_LIMITS.FULL_NAME_MAX, {
        error: t('form.validation.tooLong', { max: USER_FORM_LIMITS.FULL_NAME_MAX }),
      }),
    password: z
      .string()
      .min(USER_FORM_LIMITS.PASSWORD_MIN, {
        error: t('form.validation.passwordMin', { min: USER_FORM_LIMITS.PASSWORD_MIN }),
      })
      .max(USER_FORM_LIMITS.PASSWORD_MAX, {
        error: t('form.validation.tooLong', { max: USER_FORM_LIMITS.PASSWORD_MAX }),
      }),
    role: z.enum(ROLES, { error: t('form.validation.roleRequired') }),
  });
