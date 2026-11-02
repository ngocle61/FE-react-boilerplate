import type { ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { BaseFieldProps } from '../types';

export interface TextareaFieldProps<TValues extends FieldValues>
  extends
    BaseFieldProps<TValues>,
    Omit<
      ComponentProps<'textarea'>,
      'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'id' | 'className' | 'disabled'
    > {}
