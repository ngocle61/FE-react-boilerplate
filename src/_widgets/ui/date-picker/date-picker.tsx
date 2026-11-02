import { useState } from 'react';

import { DATE_PICKER_FORMAT, DATE_PICKER_PLACEHOLDER } from './constants';
import { DatePickerTrigger } from './date-picker-trigger';
import type { DatePickerProps } from './types';
import { formatDateLabel } from './utils';
import { Calendar } from '../calendar/calendar';
import { CALENDAR_CAPTION_LAYOUTS, CALENDAR_SELECTION_MODES } from '../calendar/constants';
import { POPOVER_ALIGNMENTS } from '../popover/constants';
import { Popover } from '../popover/popover';
import { PopoverContent } from '../popover/popover-content';
import { PopoverTrigger } from '../popover/popover-trigger';

export const DatePicker = ({
  value,
  onValueChange,
  placeholder = DATE_PICKER_PLACEHOLDER,
  formatStr = DATE_PICKER_FORMAT,
  locale,
  disabledDays,
  ...triggerProps
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const label = formatDateLabel(value, formatStr, locale);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DatePickerTrigger {...triggerProps}>
          {label ?? <span className="text-muted-foreground">{placeholder}</span>}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent align={POPOVER_ALIGNMENTS.START} className="w-auto overflow-hidden p-0">
        <Calendar
          mode={CALENDAR_SELECTION_MODES.SINGLE}
          captionLayout={CALENDAR_CAPTION_LAYOUTS.DROPDOWN}
          locale={locale}
          selected={value}
          defaultMonth={value}
          disabled={disabledDays}
          autoFocus
          onSelect={(date) => {
            onValueChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
