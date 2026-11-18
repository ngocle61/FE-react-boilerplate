import type { InterventionRow } from './intervention-row.type';

export interface UnscheduledPanelProps {
  rows: InterventionRow[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (row: InterventionRow) => void;
  onDropUnschedule: (interventionId: string) => void;
}
