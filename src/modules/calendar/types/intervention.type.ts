import type { InterventionStatus, UpdateInterventionPayload } from '@/core/types/intervention.dto';

import type { InterventionRow } from './intervention-row.type';

export interface InterventionQueryParams {
  from?: string;
  to?: string;
  technicianId?: string;
  status?: InterventionStatus[];
  unscheduled?: boolean;
  search?: string;
}

export interface UpdateInterventionVariables {
  id: string;
  payload: UpdateInterventionPayload;
}

export interface ScheduleRows {
  scheduled: InterventionRow[];
  unscheduled: InterventionRow[];
}
