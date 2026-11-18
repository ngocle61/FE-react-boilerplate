import type { FieldValues } from 'react-hook-form';

import { DatePicker } from '../../date-picker/date-picker';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { DatePickerFieldProps } from './types';

export const DatePickerField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  placeholder,
  formatStr,
  locale,
  disabledDays,
}: DatePickerFieldProps<TValues>) => {
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
      <DatePicker
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        value={field.value ?? undefined}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        placeholder={placeholder}
        formatStr={formatStr}
        locale={locale}
        disabledDays={disabledDays}
      />
    </FormFieldShell>
  );
};
