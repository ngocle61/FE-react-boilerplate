import type {
  ChevronProps,
  DayButtonProps,
  DayPickerProps,
  RootProps,
  WeekNumberProps,
} from 'react-day-picker';

import type { ButtonProps } from '../button/types';

export type CalendarButtonVariant = ButtonProps['variant'];

export type CalendarProps = DayPickerProps & {
  buttonVariant?: CalendarButtonVariant;
};

export type CalendarRootProps = RootProps;

export type CalendarChevronProps = ChevronProps;

export type CalendarDayButtonProps = DayButtonProps;

export type CalendarWeekNumberProps = WeekNumberProps;

export type CalendarModifiers = DayButtonProps['modifiers'];

export interface CalendarClassNamesParams {
  captionLayout: DayPickerProps['captionLayout'];
  buttonVariant: CalendarButtonVariant;
  showWeekNumber: DayPickerProps['showWeekNumber'];
  classNames: DayPickerProps['classNames'];
}
