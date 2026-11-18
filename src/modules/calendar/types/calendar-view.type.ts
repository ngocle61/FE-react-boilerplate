import type { CALENDAR_VIEW_MODES } from '../constants/calendar-view.constant';

export type CalendarViewMode = (typeof CALENDAR_VIEW_MODES)[keyof typeof CALENDAR_VIEW_MODES];

export interface CalendarRange {
  from: Date;
  to: Date;
}
