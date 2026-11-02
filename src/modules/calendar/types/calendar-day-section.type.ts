import type { InterventionRow } from './intervention-row.type';
import type { Technician } from './technician.type';

export interface CalendarDaySectionProps {
  rows: InterventionRow[];
  technicians: Technician[];
  currentDate: Date;
  combined: boolean;
  onSelect: (row: InterventionRow) => void;
  onReschedule: (interventionId: string, technicianId: string, startsAt: Date) => void;
  onRescheduleTime: (interventionId: string, startsAt: Date) => void;
}
