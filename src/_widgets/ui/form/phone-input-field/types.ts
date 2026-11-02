import type { FieldValues } from 'react-hook-form';

import type { PhoneInputProps } from '../../phone-input/types';
import type { BaseFieldProps } from '../types';

export interface PhoneInputFieldProps<TValues extends FieldValues>
  extends BaseFieldProps<TValues>, Pick<PhoneInputProps, 'placeholder' | 'defaultCountry'> {}
