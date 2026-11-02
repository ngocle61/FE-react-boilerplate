import type { FieldValues } from 'react-hook-form';

import { Switch } from '../../switch/switch';
import { FormChoiceFieldShell } from '../form-choice-field-shell/form-choice-field-shell';
import { useFormField } from '../use-form-field';
import type { SwitchFieldProps } from './types';

export const SwitchField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
}: SwitchFieldProps<TValues>) => {
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
    <FormChoiceFieldShell {...shellProps}>
      <Switch
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        checked={Boolean(field.value)}
        onCheckedChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
      />
    </FormChoiceFieldShell>
  );
};
