import type { InterventionStatus } from '@/core/types/intervention.dto';

export interface InterventionStatusBadgeProps {
  status: InterventionStatus;
  className?: string;
}
