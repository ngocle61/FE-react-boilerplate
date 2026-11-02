import type { CalendarFilterValues } from '../types/calendar-filters.type';
import type { InterventionRow } from '../types/intervention-row.type';
import type { Technician } from '../types/technician.type';

const includesText = (value: Nullable<string>, search: string): boolean =>
  value?.toLowerCase().includes(search) ?? false;

export const matchesCalendarFilters = (
  row: InterventionRow,
  { search, technicianIds, statuses }: CalendarFilterValues,
): boolean => {
  const normalizedSearch = search.toLowerCase();
  const matchesTechnician =
    technicianIds.length === 0 ||
    (row.technicianId !== null && technicianIds.includes(row.technicianId));
  const matchesStatus = statuses.length === 0 || statuses.includes(row.status);
  const matchesSearch =
    normalizedSearch.length === 0 ||
    includesText(row.clientName, normalizedSearch) ||
    includesText(row.type, normalizedSearch) ||
    includesText(row.notes, normalizedSearch);

  return matchesTechnician && matchesStatus && matchesSearch;
};

export const filterInterventionRows = (
  rows: readonly InterventionRow[],
  filters: CalendarFilterValues,
): InterventionRow[] => rows.filter((row) => matchesCalendarFilters(row, filters));

export const filterTechnicians = (
  technicians: readonly Technician[],
  technicianIds: readonly string[],
): Technician[] =>
  technicianIds.length === 0
    ? [...technicians]
    : technicians.filter((technician) => technicianIds.includes(technician.id));
