import type { ReactNode } from 'react';
import type {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  RefCallBack,
} from 'react-hook-form';

import type { FIELD_LABEL_DISPLAYS } from './constants';

export interface FieldAriaIds {
  controlId: string;
  descriptionId: string;
  errorId: string;
}

export interface FieldDescribedByState {
  hasDescription: boolean;
  hasError: boolean;
}

export type FieldLabelDisplay = (typeof FIELD_LABEL_DISPLAYS)[keyof typeof FIELD_LABEL_DISPLAYS];

export interface BaseFieldProps<TValues extends FieldValues> {
  name: FieldPath<TValues>;
  label: ReactNode;
  labelDisplay?: FieldLabelDisplay;
  description?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export interface FieldShellProps {
  ids: FieldAriaIds;
  label: ReactNode;
  labelDisplay?: FieldLabelDisplay;
  description?: ReactNode;
  error?: FieldError;
  invalid: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FieldControlProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby': Maybe<string>;
}

export interface FormFieldBinding<TValues extends FieldValues> {
  field: Omit<ControllerRenderProps<TValues, FieldPath<TValues>>, 'ref'>;
  fieldRef: RefCallBack;
  shellProps: FieldShellProps;
  controlProps: FieldControlProps;
}
