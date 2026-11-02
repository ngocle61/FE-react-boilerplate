import type { HttpError } from '../utils/http-error.util';

export interface AppMutationMeta extends Record<string, unknown> {
  skipErrorToast?: boolean;
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: HttpError;
    mutationMeta: AppMutationMeta;
  }
}
