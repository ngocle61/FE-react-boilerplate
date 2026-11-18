import type { InterventionRow } from './intervention-row.type';
import type { Technician } from './technician.type';

export interface TechnicianScheduleListProps {
  technician: Technician;
  rows: InterventionRow[];
  day: Date;
  onSelect: (row: InterventionRow) => void;
  onDropIntervention: (interventionId: string, technicianId: string, startsAt: Date) => void;
}
