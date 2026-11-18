import { getViewRange } from './calendar-range.util';
import { CALENDAR_VIEW_MODES } from '../constants/calendar-view.constant';
import {
  CALENDAR_DAY_LABEL_FORMAT,
  CALENDAR_MONTH_LABEL_FORMAT,
  CALENDAR_WEEK_RANGE_FORMAT,
  CLOCK_TIME_FORMAT,
  DAY_OF_MONTH_FORMAT,
  WEEK_RANGE_SEPARATOR,
  WEEKDAY_SHORT_FORMAT,
} from '../constants/date-format.constant';
import type { CalendarViewMode } from '../types/calendar-view.type';
import type { TimeRangeParts } from '../types/intervention-card.type';
import type { InterventionRow } from '../types/intervention-row.type';

export const formatCalendarLabel = (date: Date, view: CalendarViewMode, locale: string): string => {
  if (view === CALENDAR_VIEW_MODES.DAY) {
    return new Intl.DateTimeFormat(locale, CALENDAR_DAY_LABEL_FORMAT).format(date);
  }

  if (view === CALENDAR_VIEW_MODES.WEEK) {
    const { from, to } = getViewRange(date, CALENDAR_VIEW_MODES.WEEK);
    const formatter = new Intl.DateTimeFormat(locale, CALENDAR_WEEK_RANGE_FORMAT);
    return `${formatter.format(from)}${WEEK_RANGE_SEPARATOR}${formatter.format(to)}`;
  }

  return new Intl.DateTimeFormat(locale, CALENDAR_MONTH_LABEL_FORMAT).format(date);
};

export const formatClockTime = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, CLOCK_TIME_FORMAT).format(date);

export const toTimeRangeParts = (
  { startsAt, endsAt }: Pick<InterventionRow, 'startsAt' | 'endsAt'>,
  locale: string,
): Nullable<TimeRangeParts> => {
  if (!startsAt) return null;
  return {
    start: formatClockTime(startsAt, locale),
    end: endsAt ? formatClockTime(endsAt, locale) : '',
  };
};

export const formatWeekdayShort = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, WEEKDAY_SHORT_FORMAT).format(date);

export const formatDayOfMonth = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, DAY_OF_MONTH_FORMAT).format(date);
