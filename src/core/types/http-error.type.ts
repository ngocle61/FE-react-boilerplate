import type { z } from 'zod';

import type { TranslationKey } from './language.type';
import type { ERROR_MESSAGES_NAMESPACE } from '../constants/http.constant';

export type ErrorMessageKey = TranslationKey<typeof ERROR_MESSAGES_NAMESPACE>;

export interface FieldErrorIssue {
  key: string;
  params?: Record<string, number>;
}

export type FieldErrors = Record<string, FieldErrorIssue[]>;

export interface HttpErrorBody {
  code?: string;
  message?: string;
  errors?: FieldErrors;
}

export interface HttpErrorDetails {
  messageKey: string;
  status?: number;
  code?: string;
  fieldErrors?: FieldErrors;
  cause?: unknown;
}

declare module 'axios' {
  interface AxiosRequestConfig {
    responseSchema?: z.ZodType;
  }

  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
