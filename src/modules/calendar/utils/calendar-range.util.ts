import {
  addDays,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { CALENDAR_VIEW_MODES } from '../constants/calendar-view.constant';
import { CALENDAR_WEEK_OPTIONS } from '../constants/calendar.constant';
import { DATE_PARAM_FORMAT } from '../constants/date-format.constant';
import type { CalendarRange, CalendarViewMode } from '../types/calendar-view.type';

export const getViewRange = (date: Date, view: CalendarViewMode): CalendarRange => {
  if (view === CALENDAR_VIEW_MODES.DAY) return { from: startOfDay(date), to: endOfDay(date) };
  if (view === CALENDAR_VIEW_MODES.WEEK) {
    return {
      from: startOfWeek(date, CALENDAR_WEEK_OPTIONS),
      to: endOfWeek(date, CALENDAR_WEEK_OPTIONS),
    };
  }
  return { from: startOfMonth(date), to: endOfMonth(date) };
};

export const shiftDate = (date: Date, view: CalendarViewMode, direction: 1 | -1): Date => {
  if (view === CALENDAR_VIEW_MODES.DAY) return addDays(date, direction);
  if (view === CALENDAR_VIEW_MODES.WEEK) return addWeeks(date, direction);
  return addMonths(date, direction);
};

export const parseDateParam = (param: Maybe<string>): Date =>
  param ? parseISO(param) : new Date();

export const toDateParam = (date: Date): string => format(date, DATE_PARAM_FORMAT);
