import type { InterventionRow } from '../types/intervention-row.type';

export const groupRowsByTechnician = (
  rows: readonly InterventionRow[],
): Map<string, InterventionRow[]> => {
  const groups = new Map<string, InterventionRow[]>();

  for (const row of rows) {
    if (!row.technicianId) continue;
    groups.set(row.technicianId, [...(groups.get(row.technicianId) ?? []), row]);
  }

  return groups;
};
