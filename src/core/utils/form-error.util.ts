import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { getFieldErrorMessages } from './http-error.util';
import { SERVER_FIELD_ERROR_TYPE } from '../constants/http.constant';
import type { ServerFieldMap } from '../types/form-error.type';

export const applyServerFieldErrors = <TValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TValues>,
  fields?: ServerFieldMap<TValues>,
): void => {
  Object.entries(getFieldErrorMessages(error)).forEach(([field, message]) => {
    const name = fields ? fields[field] : (field as Path<TValues>);
    if (name) setError(name, { type: SERVER_FIELD_ERROR_TYPE, message });
  });
};
