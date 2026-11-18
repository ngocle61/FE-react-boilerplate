import type { ComponentProps } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface FormProps<TValues extends FieldValues> extends Omit<
  ComponentProps<'form'>,
  'onSubmit'
> {
  form: UseFormReturn<TValues>;
  onSubmit?: SubmitHandler<TValues>;
}
