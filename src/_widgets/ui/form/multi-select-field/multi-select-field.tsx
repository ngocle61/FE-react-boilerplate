import type { FieldValues } from 'react-hook-form';

import { MultiSelect } from '../../multi-select/multi-select';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { MultiSelectFieldProps } from './types';

export const MultiSelectField = <TValues extends FieldValues, TValue extends ID = ID>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  options,
  placeholder,
  searchPlaceholder,
  emptyText,
  removeLabel,
  clearLabel,
}: MultiSelectFieldProps<TValues, TValue>) => {
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
      <MultiSelect
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        options={options}
        value={field.value ?? []}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
        removeLabel={removeLabel}
        clearLabel={clearLabel}
      />
    </FormFieldShell>
  );
};
