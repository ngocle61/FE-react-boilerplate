import { format, type Locale } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { DATE_RANGE_SEPARATOR } from './constants';

export const formatDateLabel = (
  date: Maybe<Date>,
  formatStr: string,
  locale?: Locale,
): Nullable<string> => (date ? format(date, formatStr, { locale }) : null);

export const formatDateRangeLabel = (
  range: Maybe<DateRange>,
  formatStr: string,
  locale?: Locale,
): Nullable<string> => {
  if (!range?.from) return null;
  if (!range.to) return format(range.from, formatStr, { locale });
  return `${format(range.from, formatStr, { locale })}${DATE_RANGE_SEPARATOR}${format(range.to, formatStr, { locale })}`;
};
