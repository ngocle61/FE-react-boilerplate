import type { ComponentProps, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { BaseFieldProps } from '../types';

export interface InputFieldProps<TValues extends FieldValues>
  extends
    BaseFieldProps<TValues>,
    Omit<
      ComponentProps<'input'>,
      'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'id' | 'className' | 'disabled'
    > {
  startAddon?: ReactNode;
}
