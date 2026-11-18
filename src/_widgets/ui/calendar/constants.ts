import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';

export const CALENDAR_CHEVRON_ORIENTATIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
} as const;

export const CALENDAR_CHEVRON_ICONS = {
  [CALENDAR_CHEVRON_ORIENTATIONS.LEFT]: ChevronLeftIcon,
  [CALENDAR_CHEVRON_ORIENTATIONS.RIGHT]: ChevronRightIcon,
  [CALENDAR_CHEVRON_ORIENTATIONS.UP]: ChevronUpIcon,
  [CALENDAR_CHEVRON_ORIENTATIONS.DOWN]: ChevronDownIcon,
} as const;

export const CALENDAR_CAPTION_LAYOUTS = {
  LABEL: 'label',
  DROPDOWN: 'dropdown',
  DROPDOWN_MONTHS: 'dropdown-months',
  DROPDOWN_YEARS: 'dropdown-years',
} as const;

export const CALENDAR_SELECTION_MODES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  RANGE: 'range',
} as const;

export const CALENDAR_MONTH_DROPDOWN_FORMAT = { month: 'short' } as const;
