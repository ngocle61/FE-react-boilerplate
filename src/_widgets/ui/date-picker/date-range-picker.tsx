import {
  DATE_PICKER_FORMAT,
  DATE_RANGE_PICKER_MONTHS,
  DATE_RANGE_PICKER_PLACEHOLDER,
} from './constants';
import { DatePickerTrigger } from './date-picker-trigger';
import type { DateRangePickerProps } from './types';
import { formatDateRangeLabel } from './utils';
import { Calendar } from '../calendar/calendar';
import { CALENDAR_SELECTION_MODES } from '../calendar/constants';
import { POPOVER_ALIGNMENTS } from '../popover/constants';
import { Popover } from '../popover/popover';
import { PopoverContent } from '../popover/popover-content';
import { PopoverTrigger } from '../popover/popover-trigger';

export const DateRangePicker = ({
  value,
  onValueChange,
  placeholder = DATE_RANGE_PICKER_PLACEHOLDER,
  formatStr = DATE_PICKER_FORMAT,
  locale,
  numberOfMonths = DATE_RANGE_PICKER_MONTHS,
  disabledDays,
  ...triggerProps
}: DateRangePickerProps) => {
  const label = formatDateRangeLabel(value, formatStr, locale);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DatePickerTrigger {...triggerProps}>
          {label ?? <span className="text-muted-foreground">{placeholder}</span>}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent align={POPOVER_ALIGNMENTS.START} className="w-auto overflow-hidden p-0">
        <Calendar
          mode={CALENDAR_SELECTION_MODES.RANGE}
          locale={locale}
          selected={value}
          defaultMonth={value?.from}
          numberOfMonths={numberOfMonths}
          disabled={disabledDays}
          autoFocus
          onSelect={(range) => onValueChange?.(range)}
        />
      </PopoverContent>
    </Popover>
  );
};
