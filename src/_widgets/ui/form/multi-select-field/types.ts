import type { FieldValues } from 'react-hook-form';

import type { BaseFieldProps } from '../types';

export interface MultiSelectFieldProps<
  TValues extends FieldValues,
  TValue extends ID = ID,
> extends BaseFieldProps<TValues> {
  options: readonly ValueOption<TValue>[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  removeLabel?: string;
  clearLabel?: string;
}
