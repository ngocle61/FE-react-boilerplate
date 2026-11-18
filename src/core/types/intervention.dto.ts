import type { z } from 'zod';

import type { INTERVENTION_STATUSES, TIME_SLOTS } from '../constants/intervention.constant';
import type {
  zInterventionClientSummary,
  zInterventionResponse,
  zInterventionsCreateBody,
  zInterventionsListQuery,
  zInterventionsUpdateBody,
  zInterventionTechnicianSummary,
} from '../contract/zod.gen';

export type InterventionStatus = (typeof INTERVENTION_STATUSES)[keyof typeof INTERVENTION_STATUSES];

export type TimeSlot = (typeof TIME_SLOTS)[keyof typeof TIME_SLOTS];

export type InterventionClientSummaryDto = z.infer<typeof zInterventionClientSummary>;

export type InterventionTechnicianSummaryDto = z.infer<typeof zInterventionTechnicianSummary>;

export type InterventionDto = z.infer<typeof zInterventionResponse>;

export type InterventionListRequestParams = z.input<typeof zInterventionsListQuery>;

export type CreateInterventionPayload = z.input<typeof zInterventionsCreateBody>;

export type UpdateInterventionPayload = z.input<typeof zInterventionsUpdateBody>;
