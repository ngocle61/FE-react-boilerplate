import { Field } from '../../field/field';
import { FieldDescription } from '../../field/field-description';
import { FieldError } from '../../field/field-error';
import { FieldLabel } from '../../field/field-label';
import { toLabelClassName } from '../utils';
import type { FormFieldShellProps } from './types';

export const FormFieldShell = ({
  ids,
  label,
  labelDisplay,
  description,
  error,
  invalid,
  disabled,
  className,
  orientation,
  children,
}: FormFieldShellProps) => (
  <Field
    data-invalid={invalid}
    data-disabled={disabled}
    orientation={orientation}
    className={className}
  >
    <FieldLabel htmlFor={ids.controlId} className={toLabelClassName(labelDisplay)}>
      {label}
    </FieldLabel>
    {children}
    {description && <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>}
    <FieldError id={ids.errorId} errors={[error]} />
  </Field>
);
