import type { InterventionRow } from './intervention-row.type';

export interface CombinedScheduleListProps {
  rows: InterventionRow[];
  day: Date;
  onSelect: (row: InterventionRow) => void;
  onDropIntervention: (interventionId: string, startsAt: Date) => void;
}
