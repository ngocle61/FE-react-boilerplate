import { getDefaultClassNames, type DayPickerProps } from 'react-day-picker';

import { CALENDAR_CAPTION_LAYOUTS, CALENDAR_MONTH_DROPDOWN_FORMAT } from './constants';
import type { CalendarClassNamesParams, CalendarModifiers } from './types';
import { cn } from '../../lib/cn';
import { buttonVariants } from '../button/variant';

export const toCalendarFormatters = (
  locale: DayPickerProps['locale'],
  formatters: DayPickerProps['formatters'],
): DayPickerProps['formatters'] => ({
  formatMonthDropdown: (date) => date.toLocaleString(locale?.code, CALENDAR_MONTH_DROPDOWN_FORMAT),
  ...formatters,
});

export const isSingleDaySelected = (modifiers: CalendarModifiers) =>
  modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;

export const toCalendarClassNames = ({
  captionLayout,
  buttonVariant,
  showWeekNumber,
  classNames,
}: CalendarClassNamesParams): DayPickerProps['classNames'] => {
  const defaults = getDefaultClassNames();
  const navButtonClassName = cn(
    buttonVariants({ variant: buttonVariant, size: 'icon-sm' }),
    'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
  );

  return {
    root: cn('w-fit', defaults.root),
    months: cn('relative flex flex-col gap-4 md:flex-row', defaults.months),
    month: cn('flex w-full flex-col gap-4', defaults.month),
    nav: cn(
      'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
      defaults.nav,
    ),
    button_previous: cn(navButtonClassName, defaults.button_previous),
    button_next: cn(navButtonClassName, defaults.button_next),
    month_caption: cn(
      'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
      defaults.month_caption,
    ),
    dropdowns: cn(
      'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium',
      defaults.dropdowns,
    ),
    dropdown_root: cn(
      'relative rounded-(--cell-radius) border border-input shadow-default has-focus:border-ring has-focus:ring-3 has-focus:ring-ring/20',
      defaults.dropdown_root,
    ),
    dropdown: cn('absolute inset-0 bg-popover opacity-0', defaults.dropdown),
    caption_label: cn(
      'font-semibold select-none',
      captionLayout === CALENDAR_CAPTION_LAYOUTS.LABEL
        ? 'text-sm'
        : 'flex h-8 items-center gap-1 rounded-(--cell-radius) pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
      defaults.caption_label,
    ),
    month_grid: cn('w-full border-collapse', defaults.month_grid),
    weekdays: cn('flex', defaults.weekdays),
    weekday: cn(
      'flex-1 rounded-(--cell-radius) text-xs font-medium text-muted-foreground select-none',
      defaults.weekday,
    ),
    week: cn('mt-2 flex w-full', defaults.week),
    week_number_header: cn('w-(--cell-size) select-none', defaults.week_number_header),
    week_number: cn('text-xs text-muted-foreground select-none', defaults.week_number),
    day: cn(
      'group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)',
      showWeekNumber
        ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)'
        : '[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)',
      defaults.day,
    ),
    range_start: cn(
      'relative isolate z-0 rounded-l-(--cell-radius) bg-accent after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-accent',
      defaults.range_start,
    ),
    range_middle: cn('rounded-none', defaults.range_middle),
    range_end: cn(
      'relative isolate z-0 rounded-r-(--cell-radius) bg-accent after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-accent',
      defaults.range_end,
    ),
    today: cn(
      'rounded-(--cell-radius) bg-accent text-accent-foreground data-[selected=true]:rounded-none',
      defaults.today,
    ),
    outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaults.outside),
    disabled: cn('text-muted-foreground opacity-50', defaults.disabled),
    hidden: cn('invisible', defaults.hidden),
    ...classNames,
  };
};
