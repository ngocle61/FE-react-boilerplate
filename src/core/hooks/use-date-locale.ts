import type { Locale } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { DATE_LOCALES } from '../constants/date-locale.constant';
import { toLanguage } from '../utils/i18n.util';

export const useDateLocale = (): Locale => {
  const { i18n } = useTranslation();

  return DATE_LOCALES[toLanguage(i18n.language)];
};
