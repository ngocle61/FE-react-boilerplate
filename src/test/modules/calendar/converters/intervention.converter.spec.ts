import { describe, expect, it } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { UNASSIGNED_TECHNICIAN_VALUE } from '@/modules/calendar/constants/calendar.constant';
import { interventionConverter } from '@/modules/calendar/converters/intervention.converter';
import type { InterventionFormValues } from '@/modules/calendar/types/intervention-form.type';

const baseValues = {
  clientId: '11111111-1111-4111-8111-111111111111',
  newClientName: '',
  newClientPhone: '',
  newClientEmail: '',
  type: 'Follow-up',
  technicianId: '01aa0a5f-e-bb44-739d-abe9-a8f9c0cbc2cd',
  startsAtDate: new Date('2026-09-16T00:00:00.000Z'),
  startsAtTime: '08:00',
  durationMinutes: '60',
  isUrgent: false,
  notes: '',
  status: INTERVENTION_STATUSES.SCHEDULED,
} satisfies InterventionFormValues;

describe('interventionConverter.toUpdatePayload', () => {
  it('clears schedule fields when an intervention is moved to to schedule', () => {
    const payload = interventionConverter.toUpdatePayload(
      { ...baseValues, status: INTERVENTION_STATUSES.TO_SCHEDULE },
      baseValues.clientId,
    );

    expect(payload).toMatchObject({
      status: INTERVENTION_STATUSES.TO_SCHEDULE,
      startsAt: null,
      technicianId: null,
    });
  });

  it('keeps schedule fields when an intervention remains scheduled', () => {
    const payload = interventionConverter.toUpdatePayload(baseValues, baseValues.clientId);

    expect(payload.status).toBe(INTERVENTION_STATUSES.SCHEDULED);
    expect(payload.startsAt).toEqual(expect.any(String));
    expect(payload.technicianId).toBe(baseValues.technicianId);
  });

  it('keeps an unassigned technician as null for scheduled interventions', () => {
    const payload = interventionConverter.toUpdatePayload(
      { ...baseValues, technicianId: UNASSIGNED_TECHNICIAN_VALUE },
      baseValues.clientId,
    );

    expect(payload.technicianId).toBeNull();
  });

  it('sends null notes so clearing the notes field clears them on the server', () => {
    const payload = interventionConverter.toUpdatePayload(baseValues, baseValues.clientId);

    expect(payload).toHaveProperty('notes', null);
    expect(JSON.parse(JSON.stringify(payload))).toHaveProperty('notes', null);
  });

  it('sends the edited notes text', () => {
    const payload = interventionConverter.toUpdatePayload(
      { ...baseValues, notes: 'Bring the ladder' },
      baseValues.clientId,
    );

    expect(payload.notes).toBe('Bring the ladder');
  });
});

describe('interventionConverter.toCreatePayload', () => {
  it('omits empty notes when creating an intervention', () => {
    const payload = interventionConverter.toCreatePayload(baseValues, baseValues.clientId);

    expect(payload.notes).toBeUndefined();
  });
});
