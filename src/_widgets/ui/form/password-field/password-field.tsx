import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { INPUT_GROUP_ADDON_ALIGNMENTS } from '../../input-group/constants';
import { InputGroup } from '../../input-group/input-group';
import { InputGroupAddon } from '../../input-group/input-group-addon';
import { InputGroupInput } from '../../input-group/input-group-input';
import { FormFieldShell } from '../form-field-shell/form-field-shell';
import { useFormField } from '../use-form-field';
import { PASSWORD_FIELD_HIDE_LABEL, PASSWORD_FIELD_SHOW_LABEL } from './constants';
import { PasswordToggleButton } from './password-toggle-button';
import type { PasswordFieldProps } from './types';

export const PasswordField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  showPasswordLabel = PASSWORD_FIELD_SHOW_LABEL,
  hidePasswordLabel = PASSWORD_FIELD_HIDE_LABEL,
  ...inputProps
}: PasswordFieldProps<TValues>) => {
  const [isVisible, setIsVisible] = useState(false);

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
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          {...field}
          ref={fieldRef}
          {...controlProps}
          type={isVisible ? 'text' : 'password'}
          value={field.value ?? ''}
        />
        <InputGroupAddon align={INPUT_GROUP_ADDON_ALIGNMENTS.INLINE_END}>
          <PasswordToggleButton
            controlId={controlProps.id}
            isVisible={isVisible}
            showLabel={showPasswordLabel}
            hideLabel={hidePasswordLabel}
            disabled={disabled}
            onToggle={() => setIsVisible((visible) => !visible)}
          />
        </InputGroupAddon>
      </InputGroup>
    </FormFieldShell>
  );
};
