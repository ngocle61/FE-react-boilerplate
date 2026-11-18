import type { FieldValues } from 'react-hook-form';

import type { BaseFieldProps } from '../types';

export interface SelectFieldProps<TValues extends FieldValues> extends BaseFieldProps<TValues> {
  options: readonly ValueOption<string>[];
  placeholder?: string;
}
