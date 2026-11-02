import { I18N_NAMESPACES } from './language.constant';

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_ERROR_NAME = 'HttpError';

export const BEARER_SCHEME = 'Bearer';

export const AUTHORIZATION_HEADER = 'Authorization';

export const ERROR_MESSAGES_NAMESPACE = I18N_NAMESPACES.ERRORS;

export const DEFAULT_ERROR_MESSAGE_KEY = 'internal';

export const NETWORK_ERROR_MESSAGE_KEY = 'networkError';

export const SERVER_FIELD_ERROR_TYPE = 'server';

export const CONTRACT_MISMATCH_ERROR_CODE = 'contract_mismatch';

export const CONTRACT_MISMATCH_MESSAGE_KEY = 'contractMismatch';

export const BOOLEAN_QUERY_VALUES = {
  TRUE: 'true',
  FALSE: 'false',
} as const;
