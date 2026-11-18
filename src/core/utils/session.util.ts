import { isAxiosError } from 'axios';

import { HTTP_STATUS } from '../constants/http.constant';
import { MISSING_REFRESH_TOKEN_ERROR } from '../constants/session.constant';

export const isSessionRejectedError = (error: unknown): boolean => {
  if (error instanceof Error && error.message === MISSING_REFRESH_TOKEN_ERROR) return true;
  if (!isAxiosError(error)) return false;

  const status = error.response?.status;
  return status === HTTP_STATUS.UNAUTHORIZED || status === HTTP_STATUS.FORBIDDEN;
};
