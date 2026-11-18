import { MINUTES_PER_HALF_HOUR, MINUTES_PER_HOUR } from '@/shared/constants/time.constant';

import {
  DAY_VIEW_CARD_MINUTES,
  DAY_VIEW_END_HOUR,
  DAY_VIEW_PX_PER_MINUTE,
  DAY_VIEW_SNAP_MINUTES,
  DAY_VIEW_START_HOUR,
} from '../constants/calendar.constant';
import { DROP_SLOT_LINE_KINDS } from '../constants/time-grid.constant';
import type { DropSlotLine, DropSlotLineKind } from '../types/time-grid.type';

const getDayGridMinutes = (): number =>
  (DAY_VIEW_END_HOUR - DAY_VIEW_START_HOUR) * MINUTES_PER_HOUR;

export const getMinutesFromDayStart = (date: Date): number =>
  (date.getHours() - DAY_VIEW_START_HOUR) * MINUTES_PER_HOUR + date.getMinutes();

export const getCardTop = (startsAt: Date): number =>
  Math.max(0, getMinutesFromDayStart(startsAt)) * DAY_VIEW_PX_PER_MINUTE;

export const getDayGridHeight = (): number => getDayGridMinutes() * DAY_VIEW_PX_PER_MINUTE;

export const HOUR_ROW_HEIGHT_PX = MINUTES_PER_HOUR * DAY_VIEW_PX_PER_MINUTE;

export const CARD_HEIGHT_PX = DAY_VIEW_CARD_MINUTES * DAY_VIEW_PX_PER_MINUTE;

export const getHourMarks = (): number[] => {
  const marks: number[] = [];
  for (let hour = DAY_VIEW_START_HOUR; hour <= DAY_VIEW_END_HOUR; hour += 1) marks.push(hour);
  return marks;
};

const getDropSlotLineKind = (minutes: number): DropSlotLineKind => {
  if (minutes % MINUTES_PER_HOUR === 0) return DROP_SLOT_LINE_KINDS.HOUR;
  if (minutes % MINUTES_PER_HALF_HOUR === 0) return DROP_SLOT_LINE_KINDS.HALF_HOUR;
  return DROP_SLOT_LINE_KINDS.QUARTER;
};

export const getDropSlotLines = (): DropSlotLine[] =>
  Array.from({ length: getDayGridMinutes() / DAY_VIEW_SNAP_MINUTES }, (_, index) => {
    const minutes = index * DAY_VIEW_SNAP_MINUTES;
    return { minutes, top: minutes * DAY_VIEW_PX_PER_MINUTE, kind: getDropSlotLineKind(minutes) };
  });

const snapMinutes = (minutes: number): number =>
  Math.round(minutes / DAY_VIEW_SNAP_MINUTES) * DAY_VIEW_SNAP_MINUTES;

const clampMinutesToGrid = (minutes: number): number =>
  Math.min(Math.max(minutes, 0), getDayGridMinutes());

export const getGrabOffsetMinutes = (
  pointerOffsetPx: number,
  startsAt: Date,
  displayStart: Date,
): number => {
  const pointerFromStartPx = pointerOffsetPx - (getCardTop(startsAt) - getCardTop(displayStart));
  return Math.min(Math.max(pointerFromStartPx, 0), CARD_HEIGHT_PX) / DAY_VIEW_PX_PER_MINUTE;
};

export const getDropStartMinutes = (pointerOffsetPx: number, grabOffsetMinutes: number): number =>
  clampMinutesToGrid(snapMinutes(pointerOffsetPx / DAY_VIEW_PX_PER_MINUTE - grabOffsetMinutes));

export const toStartsAtFromMinutes = (day: Date, minutes: number): Date => {
  const result = new Date(day);
  result.setHours(DAY_VIEW_START_HOUR, 0, 0, 0);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};
