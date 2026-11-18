import { describe, expect, it } from 'vitest';

import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';
import { layoutOverlaps } from '@/modules/calendar/utils/overlap-layout.util';

const at = (hour: number, minute = 0) => new Date(2026, 8, 15, hour, minute);

const toRow = (id: string, startsAt: Date, durationMinutes = 60) =>
  ({ id, startsAt, durationMinutes }) as InterventionRow;

const layoutById = (rows: InterventionRow[]) =>
  Object.fromEntries(layoutOverlaps(rows).map((entry) => [entry.row.id, entry]));

describe('layoutOverlaps', () => {
  it('keeps cards whose boxes do not meet full width at their own times', () => {
    const layout = layoutById([toRow('a', at(8), 240), toRow('b', at(10))]);

    expect(layout.a).toMatchObject({ column: 0, columnCount: 1, displayStart: at(8) });
    expect(layout.b).toMatchObject({ column: 0, columnCount: 1, displayStart: at(10) });
  });

  it('puts cards side by side on the same top when their boxes would collide', () => {
    const layout = layoutById([toRow('a', at(8), 30), toRow('b', at(8, 45), 15)]);

    expect(layout.a).toMatchObject({ column: 0, columnCount: 2, displayStart: at(8) });
    expect(layout.b).toMatchObject({ column: 1, columnCount: 2, displayStart: at(8) });
  });

  it('keeps real times for a chain of collisions so cards sharing a column never stack', () => {
    const layout = layoutById([toRow('a', at(8)), toRow('b', at(9)), toRow('c', at(10))]);

    expect(layout.a).toMatchObject({ column: 0, displayStart: at(8) });
    expect(layout.b).toMatchObject({ column: 1, displayStart: at(9) });
    expect(layout.c).toMatchObject({ column: 0, displayStart: at(10) });
  });
});
