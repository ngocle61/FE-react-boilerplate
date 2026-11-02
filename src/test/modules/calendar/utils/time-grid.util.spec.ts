import { describe, expect, it } from 'vitest';

import {
  DAY_VIEW_CARD_MINUTES,
  DAY_VIEW_PX_PER_MINUTE,
} from '@/modules/calendar/constants/calendar.constant';
import {
  getDropSlotLines,
  getDropStartMinutes,
  getGrabOffsetMinutes,
  toStartsAtFromMinutes,
} from '@/modules/calendar/utils/time-grid.util';

const at = (hour: number, minute = 0) => new Date(2026, 8, 15, hour, minute);

const offsetAt = (hour: number, minute = 0) => ((hour - 7) * 60 + minute) * DAY_VIEW_PX_PER_MINUTE;

describe('getDropStartMinutes', () => {
  it('snaps the card top to the nearest quarter hour', () => {
    expect(getDropStartMinutes(offsetAt(10, 37), 0)).toBe(210);
    expect(getDropStartMinutes(offsetAt(10, 38), 0)).toBe(225);
  });

  it('subtracts the grab point so the card keeps its place under the pointer', () => {
    expect(getDropStartMinutes(offsetAt(11), 30)).toBe(210);
  });

  it('keeps the start inside the day grid', () => {
    expect(getDropStartMinutes(offsetAt(7, 10), 45)).toBe(0);
    expect(getDropStartMinutes(offsetAt(21), 0)).toBe(780);
  });
});

describe('getGrabOffsetMinutes', () => {
  it('measures the grab point from the start of the card', () => {
    expect(getGrabOffsetMinutes(36, at(10), at(10))).toBeCloseTo(30);
  });

  it('measures from the real start when the card is lined up with its neighbours', () => {
    expect(getGrabOffsetMinutes(48, at(10, 30), at(10))).toBeCloseTo(10);
  });

  it('keeps the grab point inside the fixed-height card', () => {
    expect(getGrabOffsetMinutes(12, at(10, 30), at(10))).toBe(0);
    expect(getGrabOffsetMinutes(500, at(10), at(10))).toBeCloseTo(DAY_VIEW_CARD_MINUTES);
  });
});

describe('toStartsAtFromMinutes', () => {
  it('turns grid minutes into a time on the given day', () => {
    expect(toStartsAtFromMinutes(at(0), 210)).toEqual(at(10, 30));
  });
});

describe('getDropSlotLines', () => {
  it('draws one line per quarter hour and marks half hours and hours', () => {
    const lines = getDropSlotLines();

    expect(lines).toHaveLength(52);
    expect(lines.slice(0, 5).map(({ minutes, kind }) => [minutes, kind])).toEqual([
      [0, 'hour'],
      [15, 'quarter'],
      [30, 'halfHour'],
      [45, 'quarter'],
      [60, 'hour'],
    ]);
    expect(lines[4]?.top).toBeCloseTo(offsetAt(8));
  });
});
