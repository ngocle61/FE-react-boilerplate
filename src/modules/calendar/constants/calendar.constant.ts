import { DRAG_DATA_FORMATS } from '@/shared/constants/drag-and-drop.constant';

import { CALENDAR_VIEW_MODES } from './calendar-view.constant';
import { DROP_SLOT_LINE_KINDS } from './time-grid.constant';
import type { CalendarViewMode } from '../types/calendar-view.type';
import type { DropSlotLineKind } from '../types/time-grid.type';

export const CALENDAR_VIEW_MODE_OPTIONS: readonly CalendarViewMode[] = [
  CALENDAR_VIEW_MODES.DAY,
  CALENDAR_VIEW_MODES.WEEK,
  CALENDAR_VIEW_MODES.MONTH,
];

export const DAY_VIEW_START_HOUR = 7;
export const DAY_VIEW_END_HOUR = 20;
export const DAY_VIEW_PX_PER_MINUTE = 1.2;
export const DAY_VIEW_CARD_MINUTES = 100;
export const DAY_VIEW_SNAP_MINUTES = 15;

export const DEFAULT_INTERVENTION_START_HOUR = 9;

export const CALENDAR_WEEK_OPTIONS = { weekStartsOn: 1 } as const;

export const DROP_SLOT_LINE_CLASS: Record<DropSlotLineKind, string> = {
  [DROP_SLOT_LINE_KINDS.HOUR]: 'border-muted-foreground/40',
  [DROP_SLOT_LINE_KINDS.HALF_HOUR]: 'border-dashed border-muted-foreground/25',
  [DROP_SLOT_LINE_KINDS.QUARTER]: 'border-dotted border-muted-foreground/15',
};

export const UNASSIGNED_TECHNICIAN_VALUE = '__unassigned__';

export const INTERVENTION_DRAG_DATA_FORMAT = DRAG_DATA_FORMATS.TEXT;

export const TECHNICIAN_COLOR_PALETTE: readonly string[] = [
  '#2563eb',
  '#16a34a',
  '#9333ea',
  '#ea580c',
  '#dc2626',
  '#0891b2',
  '#ca8a04',
  '#db2777',
];
