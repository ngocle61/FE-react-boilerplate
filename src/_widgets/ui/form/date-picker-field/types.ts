import type { FieldValues } from 'react-hook-form';

import type { DatePickerProps, DateRangePickerProps } from '../../date-picker/types';
import type { BaseFieldProps } from '../types';

export interface DatePickerFieldProps<TValues extends FieldValues>
  extends
    BaseFieldProps<TValues>,
    Pick<DatePickerProps, 'placeholder' | 'formatStr' | 'locale' | 'disabledDays'> {}

export interface DateRangePickerFieldProps<TValues extends FieldValues>
  extends
    BaseFieldProps<TValues>,
    Pick<
      DateRangePickerProps,
      'placeholder' | 'formatStr' | 'locale' | 'disabledDays' | 'numberOfMonths'
    > {}
