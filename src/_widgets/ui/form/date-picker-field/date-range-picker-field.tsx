import type { FieldValues } from 'react-hook-form';

import { DateRangePicker } from '../../date-picker/date-range-picker';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { DateRangePickerFieldProps } from './types';

export const DateRangePickerField = <TValues extends FieldValues>({
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
  numberOfMonths,
}: DateRangePickerFieldProps<TValues>) => {
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
      <DateRangePicker
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
        numberOfMonths={numberOfMonths}
      />
    </FormFieldShell>
  );
};
