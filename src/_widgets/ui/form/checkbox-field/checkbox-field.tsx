import type { FieldValues } from 'react-hook-form';

import { Checkbox } from '../../checkbox/checkbox';
import { FormChoiceFieldShell } from '../form-choice-field-shell/form-choice-field-shell';
import { useFormField } from '../use-form-field';
import type { CheckboxFieldProps } from './types';

export const CheckboxField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
}: CheckboxFieldProps<TValues>) => {
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
      <Checkbox
        {...controlProps}
        ref={fieldRef}
        name={field.name}
        checked={Boolean(field.value)}
        onCheckedChange={(checked) => field.onChange(checked === true)}
        onBlur={field.onBlur}
        disabled={field.disabled}
      />
    </FormChoiceFieldShell>
  );
};
