import type { CalendarFilterValues } from '../types/calendar-filters.type';

export const CALENDAR_FILTERS_DEFAULT_VALUES: CalendarFilterValues = {
  search: '',
  technicianIds: [],
  statuses: [],
};

export const CALENDAR_FILTER_FIELDS = [
  'technicianIds',
  'statuses',
] as const satisfies readonly (keyof CalendarFilterValues)[];
