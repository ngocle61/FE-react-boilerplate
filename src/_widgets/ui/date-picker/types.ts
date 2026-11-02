import type { Locale } from 'date-fns';
import type { DateRange, DayPickerProps } from 'react-day-picker';

import type { ButtonProps } from '../button/types';

export type { DateRange };

type DatePickerTriggerBaseProps = Omit<
  ButtonProps,
  'value' | 'defaultValue' | 'onChange' | 'children' | 'asChild' | 'variant' | 'size'
>;

export type DatePickerTriggerProps = Omit<ButtonProps, 'asChild' | 'variant' | 'size'>;

export interface DatePickerProps extends DatePickerTriggerBaseProps {
  value?: Maybe<Date>;
  onValueChange?: (value: Maybe<Date>) => void;
  placeholder?: string;
  formatStr?: string;
  locale?: Locale;
  disabledDays?: DayPickerProps['disabled'];
}

export interface DateRangePickerProps extends DatePickerTriggerBaseProps {
  value?: Maybe<DateRange>;
  onValueChange?: (value: Maybe<DateRange>) => void;
  placeholder?: string;
  formatStr?: string;
  locale?: Locale;
  numberOfMonths?: number;
  disabledDays?: DayPickerProps['disabled'];
}
