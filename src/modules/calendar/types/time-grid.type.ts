import type { DROP_SLOT_LINE_KINDS } from '../constants/time-grid.constant';

export type DropSlotLineKind = (typeof DROP_SLOT_LINE_KINDS)[keyof typeof DROP_SLOT_LINE_KINDS];

export interface DropSlotLine {
  minutes: number;
  top: number;
  kind: DropSlotLineKind;
}
