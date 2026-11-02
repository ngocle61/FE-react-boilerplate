import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '../constants/storage-keys.constant';
import { THEMES } from '../constants/theme.constant';
import type { ThemeStore } from '../types/theme.type';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: THEMES.SYSTEM,
      actions: {
        setTheme: (theme) => set({ theme }),
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ theme }) => ({ theme }),
    },
  ),
);

export const useTheme = () => useThemeStore((state) => state.theme);

export const useThemeActions = () => useThemeStore((state) => state.actions);
