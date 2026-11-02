import type { InterventionRow } from './intervention-row.type';

export interface CalendarWeekSectionProps {
  rows: InterventionRow[];
  currentDate: Date;
  onSelect: (row: InterventionRow) => void;
}
