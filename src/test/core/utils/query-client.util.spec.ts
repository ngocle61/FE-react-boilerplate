import type { Mutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { HTTP_STATUS } from '@/core/constants/http.constant';
import { i18nReady } from '@/core/libs/i18n';
import { HttpError } from '@/core/utils/http-error.util';
import { shouldRetryQuery, toastMutationError } from '@/core/utils/query-client.util';

const toMutation = (meta?: Mutation<unknown, unknown, unknown>['meta']) =>
  ({ meta }) as Mutation<unknown, unknown, unknown>;

beforeAll(() => i18nReady);

describe('shouldRetryQuery', () => {
  it('retries a server error once', () => {
    const error = new HttpError({ messageKey: 'internal', status: 503 });

    expect(shouldRetryQuery(0, error)).toBe(true);
    expect(shouldRetryQuery(1, error)).toBe(false);
  });

  it('retries a network error that has no status', () => {
    expect(shouldRetryQuery(0, new HttpError({ messageKey: 'networkError' }))).toBe(true);
  });

  it('never retries a client error', () => {
    const error = new HttpError({ messageKey: 'notFound', status: HTTP_STATUS.NOT_FOUND });

    expect(shouldRetryQuery(0, error)).toBe(false);
  });

  it('never retries an error thrown outside the HTTP layer', () => {
    expect(shouldRetryQuery(0, new TypeError('boom'))).toBe(false);
  });
});

describe('toastMutationError', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows the translated message of a failed mutation', () => {
    const toastError = vi.spyOn(toast, 'error');

    toastMutationError(new HttpError({ messageKey: 'internal' }), {}, undefined, toMutation());

    expect(toastError).toHaveBeenCalledTimes(1);
  });

  it('stays silent when the mutation handles its own error', () => {
    const toastError = vi.spyOn(toast, 'error');

    toastMutationError(
      new HttpError({ messageKey: 'internal' }),
      {},
      undefined,
      toMutation({ skipErrorToast: true }),
    );

    expect(toastError).not.toHaveBeenCalled();
  });
});
