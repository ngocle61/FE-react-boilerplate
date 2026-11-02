import { describe, expect, it } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';
import type { Technician } from '@/modules/calendar/types/technician.type';
import { applyPendingScheduleUpdates } from '@/modules/calendar/utils/optimistic-schedule.util';

const STARTS_AT = '2026-10-21T09:00:00.000Z';

const createRow = (overrides: Partial<InterventionRow>): InterventionRow =>
  ({
    id: 'row',
    type: 'Maintenance',
    status: INTERVENTION_STATUSES.SCHEDULED,
    startsAt: null,
    endsAt: null,
    durationMinutes: 60,
    isUrgent: false,
    notes: null,
    clientName: 'Acme',
    clientPhone: null,
    clientAddress: null,
    technicianId: null,
    technicianName: null,
    ...overrides,
  }) as InterventionRow;

const TECHNICIANS = [{ id: 'tech-1', fullName: 'Morgan Tran', avatarUrl: null }] as Technician[];

describe('applyPendingScheduleUpdates', () => {
  it('moves a dropped unscheduled row onto the schedule with its technician', () => {
    const { scheduled, unscheduled } = applyPendingScheduleUpdates(
      [createRow({ id: 'a', status: INTERVENTION_STATUSES.TO_SCHEDULE })],
      [{ id: 'a', payload: { startsAt: STARTS_AT, technicianId: 'tech-1' } }],
      TECHNICIANS,
    );

    expect(unscheduled).toHaveLength(0);
    expect(scheduled[0]).toMatchObject({
      id: 'a',
      startsAt: new Date(STARTS_AT),
      endsAt: new Date('2026-10-21T10:00:00.000Z'),
      technicianId: 'tech-1',
      technicianName: 'Morgan Tran',
    });
  });

  it('moves an unscheduled drop into the unscheduled list with the new status', () => {
    const { scheduled, unscheduled } = applyPendingScheduleUpdates(
      [createRow({ id: 'a', startsAt: new Date(STARTS_AT), technicianId: 'tech-1' })],
      [
        {
          id: 'a',
          payload: {
            startsAt: null,
            technicianId: null,
            status: INTERVENTION_STATUSES.TO_SCHEDULE,
          },
        },
      ],
      TECHNICIANS,
    );

    expect(scheduled).toHaveLength(0);
    expect(unscheduled[0]).toMatchObject({
      startsAt: null,
      technicianId: null,
      status: INTERVENTION_STATUSES.TO_SCHEDULE,
    });
  });

  it('keeps one copy of a row that appears in both lists and ignores other rows', () => {
    const row = createRow({ id: 'a', startsAt: new Date(STARTS_AT) });
    const { scheduled } = applyPendingScheduleUpdates(
      [row, row, createRow({ id: 'b', startsAt: new Date(STARTS_AT) })],
      [{ id: 'other', payload: { startsAt: null } }],
      TECHNICIANS,
    );

    expect(scheduled.map(({ id }) => id)).toEqual(['a', 'b']);
  });
});
