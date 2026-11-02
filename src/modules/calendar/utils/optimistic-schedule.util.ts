import { addMinutes, parseISO } from 'date-fns';

import type { UpdateInterventionPayload } from '@/core/types/intervention.dto';

import type { InterventionRow } from '../types/intervention-row.type';
import type { ScheduleRows, UpdateInterventionVariables } from '../types/intervention.type';
import type { Technician } from '../types/technician.type';

const toStartsAt = (row: InterventionRow, payload: UpdateInterventionPayload): Nullable<Date> => {
  if (payload.startsAt === undefined) return row.startsAt;
  return payload.startsAt ? parseISO(payload.startsAt) : null;
};

const toTechnicianId = (
  row: InterventionRow,
  payload: UpdateInterventionPayload,
): Nullable<string> =>
  payload.technicianId === undefined ? row.technicianId : payload.technicianId;

const applyScheduleUpdate = (
  row: InterventionRow,
  payload: UpdateInterventionPayload,
  technicians: readonly Technician[],
): InterventionRow => {
  const startsAt = toStartsAt(row, payload);
  const technicianId = toTechnicianId(row, payload);

  return {
    ...row,
    status: payload.status ?? row.status,
    startsAt,
    endsAt: startsAt ? addMinutes(startsAt, row.durationMinutes) : null,
    technicianId,
    technicianName:
      technicians.find((technician) => technician.id === technicianId)?.fullName ?? null,
  };
};

export const applyPendingScheduleUpdates = (
  rows: readonly InterventionRow[],
  updates: readonly UpdateInterventionVariables[],
  technicians: readonly Technician[],
): ScheduleRows => {
  const uniqueRows = [...new Map(rows.map((row) => [row.id, row])).values()];
  const updatedRows = uniqueRows.map((row) =>
    updates
      .filter((update) => update.id === row.id)
      .reduce((current, { payload }) => applyScheduleUpdate(current, payload, technicians), row),
  );

  return {
    scheduled: updatedRows.filter((row) => row.startsAt !== null),
    unscheduled: updatedRows.filter((row) => row.startsAt === null),
  };
};
