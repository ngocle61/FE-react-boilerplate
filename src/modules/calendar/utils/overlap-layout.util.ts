import { MILLISECONDS_PER_MINUTE } from '@/shared/constants/time.constant';

import { DAY_VIEW_CARD_MINUTES } from '../constants/calendar.constant';
import type { InterventionRow } from '../types/intervention-row.type';
import type { ClusterEntry, LayoutedRow } from '../types/overlap-layout.type';

export const layoutOverlaps = (rows: InterventionRow[]): LayoutedRow[] => {
  const scheduled = rows
    .filter((row) => row.startsAt)
    .sort((a, b) => (a.startsAt?.getTime() ?? 0) - (b.startsAt?.getTime() ?? 0));

  const results: LayoutedRow[] = [];
  let columnEndTimes: number[] = [];
  let clusterRows: ClusterEntry[] = [];
  let clusterStart = Infinity;
  let clusterEnd = -Infinity;

  const flushCluster = () => {
    if (clusterRows.length === 0) return;
    const columnCount = Math.max(...clusterRows.map((entry) => entry.column)) + 1;
    const hasColumnPerCard = clusterRows.length === columnCount;
    for (const { row, column, start } of clusterRows) {
      results.push({
        row,
        column,
        columnCount,
        displayStart: new Date(hasColumnPerCard ? clusterStart : start),
      });
    }
    clusterRows = [];
  };

  for (const row of scheduled) {
    const start = row.startsAt?.getTime() ?? 0;
    const end = start + DAY_VIEW_CARD_MINUTES * MILLISECONDS_PER_MINUTE;

    if (start >= clusterEnd) {
      flushCluster();
      columnEndTimes = [];
      clusterStart = start;
      clusterEnd = -Infinity;
    }

    let column = columnEndTimes.findIndex((endTime) => endTime <= start);
    if (column === -1) {
      column = columnEndTimes.length;
      columnEndTimes.push(end);
    } else {
      columnEndTimes[column] = end;
    }

    clusterRows.push({ row, column, start });
    clusterStart = Math.min(clusterStart, start);
    clusterEnd = Math.max(clusterEnd, end);
  }
  flushCluster();

  return results;
};
