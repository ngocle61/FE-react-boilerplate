import { DARK_COLOR_SCHEME_QUERY, THEMES } from '../constants/theme.constant';
import type { ResolvedTheme, Theme } from '../types/theme.type';

export const isTheme = (value: string): value is Theme =>
  Object.values<string>(THEMES).includes(value);

export const toTheme = (value: string): Theme => (isTheme(value) ? value : THEMES.SYSTEM);

export const resolveTheme = (theme: Theme, prefersDark: boolean): ResolvedTheme => {
  if (theme !== THEMES.SYSTEM) return theme;
  return prefersDark ? THEMES.DARK : THEMES.LIGHT;
};

export const subscribeToColorScheme = (onChange: () => void): (() => void) => {
  const mediaQuery = window.matchMedia(DARK_COLOR_SCHEME_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
};

export const getPrefersDarkColorScheme = (): boolean =>
  window.matchMedia(DARK_COLOR_SCHEME_QUERY).matches;
