import type { InterventionDto, InterventionStatus } from '@/core/types/intervention.dto';

export interface InterventionRow {
  id: string;
  type: string;
  status: InterventionStatus;
  startsAt: Nullable<Date>;
  endsAt: Nullable<Date>;
  durationMinutes: number;
  isUrgent: boolean;
  notes: Nullable<string>;
  clientName: string;
  clientPhone: Nullable<string>;
  clientAddress: Nullable<string>;
  technicianId: Nullable<string>;
  technicianName: Nullable<string>;
  raw: InterventionDto;
}
