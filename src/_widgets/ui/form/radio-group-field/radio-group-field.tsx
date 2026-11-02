import type { FieldValues } from 'react-hook-form';

import { FIELD_LEGEND_VARIANTS, FIELD_ORIENTATIONS } from '../../field/constants';
import { Field } from '../../field/field';
import { FieldDescription } from '../../field/field-description';
import { FieldError } from '../../field/field-error';
import { FieldLabel } from '../../field/field-label';
import { FieldLegend } from '../../field/field-legend';
import { FieldSet } from '../../field/field-set';
import { RADIO_GROUP_ORIENTATIONS } from '../../radio-group/constants';
import { RadioGroup } from '../../radio-group/radio-group';
import { RadioGroupItem } from '../../radio-group/radio-group-item';
import { useFormField } from '../use-form-field';
import { toLabelClassName, toOptionControlId } from '../utils';
import type { RadioGroupFieldProps } from './types';

export const RadioGroupField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
  options,
  orientation = RADIO_GROUP_ORIENTATIONS.VERTICAL,
}: RadioGroupFieldProps<TValues>) => {
  const { field, fieldRef, shellProps, controlProps } = useFormField<TValues>({
    name,
    label,
    labelDisplay,
    description,
    className,
    disabled,
    id,
  });

  const { ids, invalid, error } = shellProps;

  return (
    <FieldSet data-invalid={invalid} data-disabled={disabled} className={className}>
      <FieldLegend variant={FIELD_LEGEND_VARIANTS.LABEL} className={toLabelClassName(labelDisplay)}>
        {label}
      </FieldLegend>
      {description && <FieldDescription id={ids.descriptionId}>{description}</FieldDescription>}
      <RadioGroup
        ref={fieldRef}
        name={field.name}
        value={field.value ?? ''}
        onValueChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        orientation={orientation}
        aria-invalid={controlProps['aria-invalid']}
        aria-describedby={controlProps['aria-describedby']}
        className="data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-6"
      >
        {options.map((option) => (
          <Field
            key={option.value}
            orientation={FIELD_ORIENTATIONS.HORIZONTAL}
            data-disabled={option.disabled}
          >
            <RadioGroupItem
              id={toOptionControlId(ids.controlId, option.value)}
              value={option.value}
              disabled={option.disabled}
              aria-invalid={invalid}
            />
            <FieldLabel htmlFor={toOptionControlId(ids.controlId, option.value)}>
              {option.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <FieldError id={ids.errorId} errors={[error]} />
    </FieldSet>
  );
};
