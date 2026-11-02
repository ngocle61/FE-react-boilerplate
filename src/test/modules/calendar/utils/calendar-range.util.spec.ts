import { describe, expect, it } from 'vitest';

import { CALENDAR_VIEW_MODES } from '@/modules/calendar/constants/calendar-view.constant';
import {
  getViewRange,
  parseDateParam,
  shiftDate,
  toDateParam,
} from '@/modules/calendar/utils/calendar-range.util';

describe('calendar range util', () => {
  it('clamps to the last day when moving a month forward from the 31st', () => {
    const next = shiftDate(new Date(2026, 0, 31), CALENDAR_VIEW_MODES.MONTH, 1);

    expect(toDateParam(next)).toBe('2026-02-28');
  });

  it('starts the week on Monday', () => {
    const { from, to } = getViewRange(new Date(2026, 9, 21), CALENDAR_VIEW_MODES.WEEK);

    expect(toDateParam(from)).toBe('2026-10-19');
    expect(toDateParam(to)).toBe('2026-10-25');
  });

  it('round-trips a date through the URL parameter', () => {
    expect(toDateParam(parseDateParam('2026-03-09'))).toBe('2026-03-09');
  });
});
