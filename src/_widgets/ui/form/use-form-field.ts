import { useController, type FieldValues } from 'react-hook-form';

import type { BaseFieldProps, FormFieldBinding } from './types';
import { useFieldIds } from './use-field-ids';
import { toDescribedBy } from './utils';

export const useFormField = <TValues extends FieldValues>({
  name,
  label,
  labelDisplay,
  description,
  className,
  disabled,
  id,
}: BaseFieldProps<TValues>): FormFieldBinding<TValues> => {
  const ids = useFieldIds(id);
  const {
    field: { ref: fieldRef, ...field },
    fieldState,
  } = useController<TValues>({ name, disabled });

  return {
    field,
    fieldRef,
    shellProps: {
      ids,
      label,
      labelDisplay,
      description,
      error: fieldState.error,
      invalid: fieldState.invalid,
      disabled,
      className,
    },
    controlProps: {
      id: ids.controlId,
      'aria-invalid': fieldState.invalid,
      'aria-describedby': toDescribedBy(ids, {
        hasDescription: Boolean(description),
        hasError: fieldState.invalid,
      }),
    },
  };
};
