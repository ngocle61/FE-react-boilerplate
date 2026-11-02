import type { FormEvent } from 'react';
import { type FieldValues, FormProvider } from 'react-hook-form';

import type { FormProps } from './types';

const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

export const Form = <TValues extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TValues>) => (
  <FormProvider {...form}>
    <form noValidate onSubmit={onSubmit ? form.handleSubmit(onSubmit) : preventSubmit} {...props}>
      {children}
    </form>
  </FormProvider>
);
