import { useSyncExternalStore } from 'react';

import { useTheme } from '../store/theme.store';
import type { ResolvedTheme } from '../types/theme.type';
import {
  getPrefersDarkColorScheme,
  resolveTheme,
  subscribeToColorScheme,
} from '../utils/theme.util';

export const useResolvedTheme = (): ResolvedTheme => {
  const theme = useTheme();
  const prefersDark = useSyncExternalStore(subscribeToColorScheme, getPrefersDarkColorScheme);

  return resolveTheme(theme, prefersDark);
};
