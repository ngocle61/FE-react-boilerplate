import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { queryClient } from '../libs/query-client';
import { authQueries } from '../queries/auth.queries';
import { useAuthStore } from '../store/auth.store';
import type { AuthSession, SessionEndReason } from '../types/auth.type';

const syncFromOtherTab = async ({ key }: StorageEvent): Promise<void> => {
  if (key !== STORAGE_KEYS.AUTH) return;

  await useAuthStore.persist.rehydrate();
  if (!useAuthStore.getState().accessToken) queryClient.clear();
};

const handleStorageEvent = (event: StorageEvent): void => {
  void syncFromOtherTab(event);
};

export const sessionService = {
  start: ({ user, tokens }: AuthSession): void => {
    queryClient.setQueryData(authQueries.currentUser().queryKey, user);
    useAuthStore.getState().actions.startSession(tokens);
  },

  end: (reason: SessionEndReason): void => {
    useAuthStore.getState().actions.endSession(reason);
    queryClient.clear();
  },

  startTabSync: (): (() => void) => {
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  },
};
