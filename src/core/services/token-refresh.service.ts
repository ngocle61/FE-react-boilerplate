import { accessTokenService } from './access-token.service';
import { sessionService } from './session.service';
import { SESSION_END_REASONS } from '../constants/session.constant';

export const tokenRefreshService = {
  refreshOrEndSession: async (): Promise<string> => {
    try {
      return await accessTokenService.refresh();
    } catch (error) {
      tokenRefreshService.endExpiredSession();
      throw error;
    }
  },

  endExpiredSession: (): void => sessionService.end(SESSION_END_REASONS.EXPIRED),
};
