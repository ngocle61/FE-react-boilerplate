import type { FieldValues } from 'react-hook-form';

import type { BaseFieldProps } from '../types';

export interface ComboboxFieldProps<
  TValues extends FieldValues,
  TValue extends ID = ID,
> extends BaseFieldProps<TValues> {
  options: readonly ValueOption<TValue>[];
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}
