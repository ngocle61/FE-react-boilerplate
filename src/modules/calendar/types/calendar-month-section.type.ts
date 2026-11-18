import type { InterventionRow } from './intervention-row.type';

export interface CalendarMonthSectionProps {
  rows: InterventionRow[];
  currentDate: Date;
  onSelect: (row: InterventionRow) => void;
}
