import type { TFunction } from 'i18next';
import { z } from 'zod';

import type { I18N_NAMESPACES } from '@/core/constants/language.constant';

export const createSignInSchema = (t: TFunction<typeof I18N_NAMESPACES.AUTHENTICATION>) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, { error: t('signIn.validation.emailRequired') })
      .pipe(z.email({ error: t('signIn.validation.emailInvalid') })),
    password: z.string().min(1, { error: t('signIn.validation.passwordRequired') }),
  });
