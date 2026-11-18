import type { THEMES } from '../constants/theme.constant';

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type ResolvedTheme = Exclude<Theme, typeof THEMES.SYSTEM>;

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
}

export interface ThemeStore {
  theme: Theme;
  actions: ThemeActions;
}
