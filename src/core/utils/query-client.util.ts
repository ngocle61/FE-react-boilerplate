import type { Mutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorMessage, isRetryableHttpError } from './http-error.util';
import { QUERY_RETRY_LIMIT } from '../constants/query-client.constant';

export const shouldRetryQuery = (failureCount: number, error: unknown): boolean =>
  failureCount < QUERY_RETRY_LIMIT && isRetryableHttpError(error);

export const toastMutationError = (
  error: unknown,
  _variables: unknown,
  _onMutateResult: unknown,
  mutation: Mutation<unknown, unknown, unknown>,
): void => {
  if (mutation.meta?.skipErrorToast) return;
  toast.error(getErrorMessage(error));
};
