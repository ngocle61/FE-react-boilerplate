import type { CalendarFilterValues, CalendarSearchState } from '../types/calendar-filters.type';

export const calendarFilterConverter = {
  toFormValues: ({
    search,
    technicianIds,
    statuses,
  }: CalendarSearchState): CalendarFilterValues => ({
    search,
    technicianIds,
    statuses,
  }),

  toQueryParams: (filters: CalendarFilterValues): CalendarFilterValues => ({
    search: filters.search.trim(),
    technicianIds: filters.technicianIds,
    statuses: filters.statuses,
  }),
};
