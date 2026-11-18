import type { FormChoiceFieldShellProps } from './types';
import { FIELD_ORIENTATIONS } from '../../field/constants';
import { Field } from '../../field/field';
import { FieldContent } from '../../field/field-content';
import { FieldDescription } from '../../field/field-description';
import { FieldError } from '../../field/field-error';
import { FieldLabel } from '../../field/field-label';
import { toLabelClassName } from '../utils';

export const FormChoiceFieldShell = ({
  ids,
  label,
  labelDisplay,
  description,
  error,
  invalid,
  disabled,
  className,
  children,
}: FormChoiceFieldShellProps) => (
  <Field
    orientation={FIELD_ORIENTATIONS.HORIZONTAL}
    data-invalid={invalid}
    data-disabled={disabled}
    className={className}
  >
    {children}
    <FieldContent>
      <FieldLabel htmlFor={ids.controlId} className={toLabelClassName(labelDisplay)}>
        {label}
      </FieldLabel>
      {description && <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>}
      <FieldError id={ids.errorId} errors={[error]} />
    </FieldContent>
  </Field>
);
