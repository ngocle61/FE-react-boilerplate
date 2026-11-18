import type { FieldValues } from 'react-hook-form';

import { Textarea } from '../../textarea/textarea';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { TextareaFieldProps } from './types';

export const TextareaField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  ...textareaProps
}: TextareaFieldProps<TValues>) => {
  const { field, fieldRef, shellProps, controlProps } = useFormField<TValues>({
    name,
    label,
    labelDisplay,
    description,
    className,
    disabled,
    id,
  });

  return (
    <FormFieldShell {...shellProps}>
      <Textarea
        {...textareaProps}
        {...field}
        {...controlProps}
        ref={fieldRef}
        value={field.value ?? ''}
      />
    </FormFieldShell>
  );
};
