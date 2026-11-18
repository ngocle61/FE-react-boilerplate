import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import type { ServerFieldMap } from '@/core/types/form-error.type';

import { UNASSIGNED_TECHNICIAN_VALUE } from './calendar.constant';
import type { InterventionFormValues } from '../types/intervention-form.type';

export const INTERVENTION_FORM_LIMITS = {
  CLIENT_NAME_MAX: 200,
  CLIENT_PHONE_MAX: 30,
  CLIENT_EMAIL_MAX: 254,
  TYPE_MAX: 100,
  NOTES_MAX: 2000,
} as const;

export const INTERVENTION_NEW_CLIENT_DEFAULT_VALUES = {
  newClientName: '',
  newClientPhone: '',
  newClientEmail: '',
} as const;

export const INTERVENTION_FORM_DEFAULT_VALUES: InterventionFormValues = {
  clientId: '',
  ...INTERVENTION_NEW_CLIENT_DEFAULT_VALUES,
  type: '',
  technicianId: UNASSIGNED_TECHNICIAN_VALUE,
  startsAtDate: undefined,
  startsAtTime: '',
  durationMinutes: '60',
  isUrgent: false,
  notes: '',
  status: INTERVENTION_STATUSES.TO_SCHEDULE,
};

export const INTERVENTION_FORM_SERVER_FIELDS: ServerFieldMap<InterventionFormValues> = {
  clientId: 'clientId',
  name: 'newClientName',
  phone: 'newClientPhone',
  email: 'newClientEmail',
  type: 'type',
  technicianId: 'technicianId',
  startsAt: 'startsAtDate',
  durationMinutes: 'durationMinutes',
  isUrgent: 'isUrgent',
  notes: 'notes',
  status: 'status',
};

export const CREATE_FORM_KEY = 'create';
