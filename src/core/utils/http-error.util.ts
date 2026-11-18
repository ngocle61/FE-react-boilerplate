import { isAxiosError, type AxiosError } from 'axios';

import {
  CONTRACT_MISMATCH_ERROR_CODE,
  CONTRACT_MISMATCH_MESSAGE_KEY,
  DEFAULT_ERROR_MESSAGE_KEY,
  ERROR_MESSAGES_NAMESPACE,
  HTTP_ERROR_NAME,
  HTTP_STATUS,
  NETWORK_ERROR_MESSAGE_KEY,
} from '../constants/http.constant';
import { i18n } from '../libs/i18n';
import type {
  ErrorMessageKey,
  FieldErrors,
  HttpErrorBody,
  HttpErrorDetails,
} from '../types/http-error.type';

export class HttpError extends Error {
  readonly status: Maybe<number>;
  readonly code: Maybe<string>;
  readonly messageKey: string;
  readonly fieldErrors: Maybe<FieldErrors>;

  constructor({ messageKey, status, code, fieldErrors, cause }: HttpErrorDetails) {
    super(messageKey, { cause });
    this.name = HTTP_ERROR_NAME;
    this.messageKey = messageKey;
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const toMessageKey = (error: AxiosError<HttpErrorBody>): string => {
  if (!error.response) return NETWORK_ERROR_MESSAGE_KEY;
  return error.response.data?.message || DEFAULT_ERROR_MESSAGE_KEY;
};

const isErrorMessageKey = (key: string): key is ErrorMessageKey =>
  i18n.exists(key, { ns: ERROR_MESSAGES_NAMESPACE });

const translateErrorKey = (key: string, params?: Record<string, number>): string =>
  i18n.t(isErrorMessageKey(key) ? key : DEFAULT_ERROR_MESSAGE_KEY, {
    ns: ERROR_MESSAGES_NAMESPACE,
    ...params,
  });

const readErrorBody = async (response: Response): Promise<HttpErrorBody> => {
  try {
    return (await response.json()) as HttpErrorBody;
  } catch {
    return {};
  }
};

export const isHttpError = (error: unknown): error is HttpError => error instanceof HttpError;

export const isRetryableHttpError = (error: unknown): boolean =>
  isHttpError(error) &&
  (error.status === undefined || error.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR);

export const toHttpError = (error: unknown): HttpError => {
  if (isHttpError(error)) return error;

  if (!isAxiosError<HttpErrorBody>(error)) {
    return new HttpError({ messageKey: DEFAULT_ERROR_MESSAGE_KEY });
  }

  const body = error.response?.data;

  return new HttpError({
    status: error.response?.status,
    code: body?.code,
    messageKey: toMessageKey(error),
    fieldErrors: body?.errors,
  });
};

export const getErrorMessage = (error: unknown): string =>
  translateErrorKey(isHttpError(error) ? error.messageKey : DEFAULT_ERROR_MESSAGE_KEY);

export const getFieldErrorMessages = (error: unknown): Record<string, string> => {
  if (!isHttpError(error) || !error.fieldErrors) return {};

  return Object.fromEntries(
    Object.entries(error.fieldErrors).flatMap(([field, issues]) => {
      const issue = issues.at(0);
      return issue ? [[field, translateErrorKey(issue.key, issue.params)] as const] : [];
    }),
  );
};

export const getFieldOrErrorMessage = (error: unknown): string =>
  Object.values(getFieldErrorMessages(error)).at(0) ?? getErrorMessage(error);

export const toBodyHttpError = (body: HttpErrorBody, status?: number): HttpError =>
  new HttpError({
    status,
    code: body.code,
    messageKey: body.message || DEFAULT_ERROR_MESSAGE_KEY,
    fieldErrors: body.errors,
  });

export const toResponseHttpError = async (response: Response): Promise<HttpError> =>
  toBodyHttpError(await readErrorBody(response), response.status);

export const toNetworkHttpError = (): HttpError =>
  new HttpError({ messageKey: NETWORK_ERROR_MESSAGE_KEY });

export const toContractHttpError = (status: number, cause: unknown): HttpError =>
  new HttpError({
    status,
    code: CONTRACT_MISMATCH_ERROR_CODE,
    messageKey: CONTRACT_MISMATCH_MESSAGE_KEY,
    cause,
  });
