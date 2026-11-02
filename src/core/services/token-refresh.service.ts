import { accessTokenService } from './access-token.service';
import { sessionService } from './session.service';
import { SESSION_END_REASONS } from '../constants/session.constant';
import { isSessionRejectedError } from '../utils/session.util';

export const tokenRefreshService = {
  refreshOrEndSession: async (): Promise<string> => {
    try {
      return await accessTokenService.refresh();
    } catch (error) {
      if (isSessionRejectedError(error)) tokenRefreshService.endExpiredSession();
      throw error;
    }
  },

  endExpiredSession: (): void => {
    if (accessTokenService.read()) sessionService.end(SESSION_END_REASONS.EXPIRED);
  },
};
