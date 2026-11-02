import { describe, expect, it } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { CALENDAR_FILTERS_DEFAULT_VALUES } from '@/modules/calendar/constants/calendar-filters.constant';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';
import type { Technician } from '@/modules/calendar/types/technician.type';
import {
  filterInterventionRows,
  filterTechnicians,
} from '@/modules/calendar/utils/calendar-filter.util';

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

const ROWS = [
  createRow({ id: 'a', technicianId: 'tech-1', clientName: 'Acme' }),
  createRow({
    id: 'b',
    technicianId: 'tech-2',
    status: INTERVENTION_STATUSES.COMPLETED,
    notes: 'Bring the LADDER',
  }),
  createRow({ id: 'c', technicianId: null, type: 'Repair', clientName: 'Globex' }),
];

const ids = (rows: InterventionRow[]) => rows.map((row) => row.id);

describe('filterInterventionRows', () => {
  it('keeps every row when no filter is set', () => {
    expect(ids(filterInterventionRows(ROWS, CALENDAR_FILTERS_DEFAULT_VALUES))).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('keeps only rows assigned to the selected technicians', () => {
    const rows = filterInterventionRows(ROWS, {
      ...CALENDAR_FILTERS_DEFAULT_VALUES,
      technicianIds: ['tech-2'],
    });

    expect(ids(rows)).toEqual(['b']);
  });

  it('keeps only rows with a selected status', () => {
    const rows = filterInterventionRows(ROWS, {
      ...CALENDAR_FILTERS_DEFAULT_VALUES,
      statuses: [INTERVENTION_STATUSES.COMPLETED],
    });

    expect(ids(rows)).toEqual(['b']);
  });

  it('searches client, type and notes without case sensitivity', () => {
    const search = (value: string) =>
      ids(filterInterventionRows(ROWS, { ...CALENDAR_FILTERS_DEFAULT_VALUES, search: value }));

    expect(search('globex')).toEqual(['c']);
    expect(search('repair')).toEqual(['c']);
    expect(search('ladder')).toEqual(['b']);
  });
});

describe('filterTechnicians', () => {
  const technicians = [
    { id: 'tech-1', fullName: 'Ann' },
    { id: 'tech-2', fullName: 'Ben' },
  ] as Technician[];

  it('keeps every technician when none is selected', () => {
    expect(filterTechnicians(technicians, [])).toEqual(technicians);
  });

  it('keeps the selected technicians only', () => {
    expect(filterTechnicians(technicians, ['tech-2']).map(({ id }) => id)).toEqual(['tech-2']);
  });
});
