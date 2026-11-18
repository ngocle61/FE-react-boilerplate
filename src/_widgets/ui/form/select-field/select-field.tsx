import type { FieldValues } from 'react-hook-form';

import { Select } from '../../select/select';
import { SelectContent } from '../../select/select-content';
import { SelectGroup } from '../../select/select-group';
import { SelectItem } from '../../select/select-item';
import { SelectTrigger } from '../../select/select-trigger';
import { SelectValue } from '../../select/select-value';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { SelectFieldProps } from './types';

export const SelectField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  options,
  placeholder,
}: SelectFieldProps<TValues>) => {
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
      <Select
        name={field.name}
        value={field.value ?? ''}
        onValueChange={field.onChange}
        disabled={field.disabled}
      >
        <SelectTrigger ref={fieldRef} onBlur={field.onBlur} {...controlProps}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormFieldShell>
  );
};
