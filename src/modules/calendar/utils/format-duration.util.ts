import type { TFunction } from 'i18next';

import type { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { MINUTES_PER_HOUR } from '@/shared/constants/time.constant';

export const formatDuration = (
  minutes: number,
  t: TFunction<typeof I18N_NAMESPACES.CALENDAR>,
): string => {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const remainder = minutes % MINUTES_PER_HOUR;

  if (hours === 0) return t('duration.minutes', { count: remainder });
  if (remainder === 0) return t('duration.hours', { count: hours });
  return t('duration.hoursAndMinutes', { hours, minutes: remainder });
};
