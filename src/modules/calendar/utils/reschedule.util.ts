import type { InterventionRow } from '../types/intervention-row.type';

export const isUnchangedSchedule = (
  row: Maybe<InterventionRow>,
  technicianId: Nullable<string>,
  startsAt: Date,
): boolean => row?.technicianId === technicianId && row.startsAt?.getTime() === startsAt.getTime();
