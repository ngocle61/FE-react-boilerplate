import type { FieldValues } from 'react-hook-form';

import type { RadioGroupProps } from '../../radio-group/types';
import type { BaseFieldProps } from '../types';

export interface RadioGroupFieldProps<TValues extends FieldValues> extends BaseFieldProps<TValues> {
  options: readonly ValueOption<string>[];
  orientation?: RadioGroupProps['orientation'];
}
