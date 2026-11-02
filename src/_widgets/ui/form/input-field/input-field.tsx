import type { FieldValues } from 'react-hook-form';

import { Input } from '../../input/input';
import { InputGroup } from '../../input-group/input-group';
import { InputGroupAddon } from '../../input-group/input-group-addon';
import { InputGroupInput } from '../../input-group/input-group-input';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import type { InputFieldProps } from './types';

export const InputField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  startAddon,
  ...inputProps
}: InputFieldProps<TValues>) => {
  const { field, fieldRef, shellProps, controlProps } = useFormField<TValues>({
    name,
    label,
    labelDisplay,
    description,
    className,
    disabled,
    id,
  });

  const inputControlProps = { ...inputProps, ...field, ...controlProps, value: field.value ?? '' };

  return (
    <FormFieldShell {...shellProps}>
      {startAddon ? (
        <InputGroup>
          <InputGroupAddon>{startAddon}</InputGroupAddon>
          <InputGroupInput ref={fieldRef} {...inputControlProps} />
        </InputGroup>
      ) : (
        <Input ref={fieldRef} {...inputControlProps} />
      )}
    </FormFieldShell>
  );
};
