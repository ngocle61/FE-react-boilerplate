import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import type { AuthStore } from '../types/auth.type';

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        endReason: null,
        actions: {
          startSession: (tokens) => set({ ...tokens, endReason: null }, false, 'auth/startSession'),
          updateTokens: (tokens) => set({ ...tokens }, false, 'auth/updateTokens'),
          endSession: (reason) =>
            set(
              { accessToken: null, refreshToken: null, endReason: reason },
              false,
              'auth/endSession',
            ),
        },
      }),
      {
        name: STORAGE_KEYS.AUTH,
        storage: createJSONStorage(() => localStorage),
        partialize: ({ accessToken, refreshToken }) => ({ accessToken, refreshToken }),
      },
    ),
    { name: 'AuthStore', enabled: import.meta.env.DEV },
  ),
);

export const useIsAuthenticated = () => useAuthStore((state) => Boolean(state.accessToken));

export const useSessionEndReason = () => useAuthStore((state) => state.endReason);

export const useAuthActions = () => useAuthStore((state) => state.actions);
