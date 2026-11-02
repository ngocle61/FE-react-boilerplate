import type { CalendarViewMode } from './calendar-view.type';
import type { InterventionRow } from './intervention-row.type';
import type { Technician } from './technician.type';

export interface CalendarViewSectionProps {
  view: CalendarViewMode;
  rows: InterventionRow[];
  technicians: Technician[];
  currentDate: Date;
  combined: boolean;
  onSelect: (row: InterventionRow) => void;
  onReschedule: (interventionId: string, technicianId: string, startsAt: Date) => void;
  onRescheduleTime: (interventionId: string, startsAt: Date) => void;
}
