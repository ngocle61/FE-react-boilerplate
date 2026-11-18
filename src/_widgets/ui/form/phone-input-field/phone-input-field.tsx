import type { FieldValues } from 'react-hook-form';

import { PhoneInput } from '../../phone-input/phone-input';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { PhoneInputFieldProps } from './types';

export const PhoneInputField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  placeholder,
  defaultCountry,
}: PhoneInputFieldProps<TValues>) => {
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
      <PhoneInput
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        autoComplete="tel"
      />
    </FormFieldShell>
  );
};
