import type { UseFormProps } from 'react-hook-form';

export const FORM_VALIDATION_MODES = {
  ON_BLUR: 'onBlur',
  ON_CHANGE: 'onChange',
  ON_SUBMIT: 'onSubmit',
  ON_TOUCHED: 'onTouched',
  ALL: 'all',
} as const;

export const SUBMIT_FIRST_VALIDATION = {
  mode: FORM_VALIDATION_MODES.ON_SUBMIT,
  reValidateMode: FORM_VALIDATION_MODES.ON_CHANGE,
} as const satisfies Pick<UseFormProps, 'mode' | 'reValidateMode'>;
