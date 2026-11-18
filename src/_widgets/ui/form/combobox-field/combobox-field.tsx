import type { FieldValues } from 'react-hook-form';

import { Combobox } from '../../combobox/combobox';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { ComboboxFieldProps } from './types';

export const ComboboxField = <TValues extends FieldValues, TValue extends ID = ID>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  options,
  onSearchChange,
  placeholder,
  searchPlaceholder,
  emptyText,
}: ComboboxFieldProps<TValues, TValue>) => {
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
      <Combobox
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        options={options}
        value={field.value}
        onValueChange={field.onChange}
        onSearchChange={onSearchChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
      />
    </FormFieldShell>
  );
};
