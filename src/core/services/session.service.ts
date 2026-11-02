import { queryClient } from '../libs/query-client';
import { authQueries } from '../queries/auth.queries';
import { useAuthStore } from '../store/auth.store';
import type { AuthSession, SessionEndReason } from '../types/auth.type';

export const sessionService = {
  start: ({ user, tokens }: AuthSession): void => {
    queryClient.setQueryData(authQueries.currentUser().queryKey, user);
    useAuthStore.getState().actions.startSession(tokens);
  },

  end: (reason: SessionEndReason): void => {
    useAuthStore.getState().actions.endSession(reason);
    queryClient.clear();
  },
};
