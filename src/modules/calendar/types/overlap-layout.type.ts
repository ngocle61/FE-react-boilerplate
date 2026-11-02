import type { InterventionRow } from './intervention-row.type';

export interface LayoutedRow {
  row: InterventionRow;
  column: number;
  columnCount: number;
  displayStart: Date;
}

export interface ClusterEntry {
  row: InterventionRow;
  column: number;
  start: number;
}
