import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { ROLES } from '@/core/constants/roles.constant';
import type {
  InterventionClientSummaryDto,
  InterventionDto,
  InterventionTechnicianSummaryDto,
} from '@/core/types/intervention.dto';
import type { UserSummaryDto } from '@/core/types/user.dto';

const CREATED_AT = '2026-10-01T00:00:00.000Z';

export const createTechnicianDto = (id: string, fullName: string): UserSummaryDto => ({
  id,
  fullName,
  avatarUrl: null,
  role: ROLES.MEMBER,
});

export const toTechnicianSummary = ({
  id,
  fullName,
  avatarUrl,
}: UserSummaryDto): InterventionTechnicianSummaryDto => ({ id, fullName, avatarUrl });

export const createClientSummary = (
  name: string,
  overrides: Partial<InterventionClientSummaryDto> = {},
): InterventionClientSummaryDto => ({
  id: `client-${name.toLowerCase()}`,
  name,
  phone: '0901 234 567',
  addressLine: '1 Main St',
  postalCode: '70000',
  city: 'Saigon',
  ...overrides,
});

export const createInterventionDto = (
  id: string,
  overrides: Partial<InterventionDto> = {},
): InterventionDto => ({
  id,
  type: 'Repair',
  status: INTERVENTION_STATUSES.SCHEDULED,
  startsAt: null,
  durationMinutes: 60,
  isUrgent: false,
  notes: null,
  callbackAt: null,
  preferredSlot: null,
  callbackAttempts: 0,
  createdAt: CREATED_AT,
  updatedAt: CREATED_AT,
  client: createClientSummary('Acme'),
  technician: null,
  ...overrides,
});
