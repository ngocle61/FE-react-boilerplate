import type { UseFormSetError } from 'react-hook-form';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { applyServerFieldErrors } from '@/core/utils/form-error.util';
import { HttpError } from '@/core/utils/http-error.util';

interface FormValues {
  newClientName: string;
  startsAtDate: Date;
}

const validationError = new HttpError({
  status: 400,
  code: 'validation_failed',
  messageKey: 'validationFailed',
  fieldErrors: {
    name: [{ key: 'fieldRequired' }],
    startsAt: [{ key: 'fieldInvalidDate' }],
    callbackAt: [{ key: 'fieldInvalidDate' }],
  },
});

beforeAll(() => i18nReady);

describe('applyServerFieldErrors', () => {
  it('sets a translated error on each form field mapped from an API field', () => {
    const setError = vi.fn<UseFormSetError<FormValues>>();

    applyServerFieldErrors<FormValues>(validationError, setError, {
      name: 'newClientName',
      startsAt: 'startsAtDate',
    });

    expect(setError).toHaveBeenCalledTimes(2);
    expect(setError).toHaveBeenCalledWith('newClientName', {
      type: 'server',
      message: 'This field is required.',
    });
    expect(setError).toHaveBeenCalledWith('startsAtDate', {
      type: 'server',
      message: 'Enter a valid date.',
    });
  });

  it('uses the API field names when the form names match', () => {
    const setError = vi.fn<UseFormSetError<Record<string, string>>>();

    applyServerFieldErrors(validationError, setError);

    expect(setError).toHaveBeenCalledTimes(3);
    expect(setError).toHaveBeenCalledWith('name', {
      type: 'server',
      message: 'This field is required.',
    });
  });

  it('does nothing when the error has no field errors', () => {
    const setError = vi.fn<UseFormSetError<FormValues>>();

    applyServerFieldErrors<FormValues>(new Error('boom'), setError);

    expect(setError).not.toHaveBeenCalled();
  });
});
