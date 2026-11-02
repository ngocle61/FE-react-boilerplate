import type { TFunction } from 'i18next';
import { z } from 'zod';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import type { I18N_NAMESPACES } from '@/core/constants/language.constant';

import { INTERVENTION_FORM_LIMITS } from '../constants/intervention-form.constant';

export const createInterventionFormSchema = (t: TFunction<typeof I18N_NAMESPACES.CALENDAR>) =>
  z
    .object({
      clientId: z.string(),
      newClientName: z
        .string()
        .trim()
        .max(INTERVENTION_FORM_LIMITS.CLIENT_NAME_MAX, {
          error: t('form.validation.tooLong', { max: INTERVENTION_FORM_LIMITS.CLIENT_NAME_MAX }),
        }),
      newClientPhone: z
        .string()
        .trim()
        .max(INTERVENTION_FORM_LIMITS.CLIENT_PHONE_MAX, {
          error: t('form.validation.tooLong', { max: INTERVENTION_FORM_LIMITS.CLIENT_PHONE_MAX }),
        }),
      newClientEmail: z
        .string()
        .trim()
        .max(INTERVENTION_FORM_LIMITS.CLIENT_EMAIL_MAX, {
          error: t('form.validation.tooLong', { max: INTERVENTION_FORM_LIMITS.CLIENT_EMAIL_MAX }),
        }),
      type: z
        .string()
        .trim()
        .min(1, { error: t('form.validation.typeRequired') })
        .max(INTERVENTION_FORM_LIMITS.TYPE_MAX, {
          error: t('form.validation.tooLong', { max: INTERVENTION_FORM_LIMITS.TYPE_MAX }),
        }),
      technicianId: z.string(),
      startsAtDate: z.date().optional(),
      startsAtTime: z.string(),
      durationMinutes: z.string().min(1, { error: t('form.validation.durationRequired') }),
      isUrgent: z.boolean(),
      notes: z
        .string()
        .trim()
        .max(INTERVENTION_FORM_LIMITS.NOTES_MAX, {
          error: t('form.validation.tooLong', { max: INTERVENTION_FORM_LIMITS.NOTES_MAX }),
        }),
      status: z.enum(INTERVENTION_STATUSES),
    })
    .refine((values) => Boolean(values.clientId) || values.newClientName.length > 0, {
      error: t('form.validation.clientRequired'),
      path: ['clientId'],
    })
    .refine(
      (values) =>
        values.status !== INTERVENTION_STATUSES.SCHEDULED || values.startsAtDate !== undefined,
      {
        error: t('form.validation.dateRequiredWhenScheduled'),
        path: ['startsAtDate'],
      },
    );
