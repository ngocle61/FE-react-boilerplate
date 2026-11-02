import { usePendingInterventionUpdates } from './use-pending-intervention-updates';
import type { InterventionRow } from '../types/intervention-row.type';
import type { ScheduleRows } from '../types/intervention.type';
import type { Technician } from '../types/technician.type';
import { applyPendingScheduleUpdates } from '../utils/optimistic-schedule.util';

export const useOptimisticScheduleRows = (
  scheduledRows: Maybe<InterventionRow[]>,
  unscheduledRows: Maybe<InterventionRow[]>,
  technicians: Maybe<Technician[]>,
): ScheduleRows => {
  const pendingUpdates = usePendingInterventionUpdates();

  return applyPendingScheduleUpdates(
    [...(scheduledRows ?? []), ...(unscheduledRows ?? [])],
    pendingUpdates,
    technicians ?? [],
  );
};
