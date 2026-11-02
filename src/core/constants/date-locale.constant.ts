import type { Locale } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

import { LANGUAGES } from './language.constant';

export const DATE_LOCALES = {
  [LANGUAGES.EN]: enUS,
  [LANGUAGES.VI]: vi,
} as const satisfies Record<(typeof LANGUAGES)[keyof typeof LANGUAGES], Locale>;
