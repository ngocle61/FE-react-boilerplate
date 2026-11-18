import { useEffect } from 'react';

import { useResolvedTheme } from './use-resolved-theme';
import { THEMES } from '../constants/theme.constant';
import type { ResolvedTheme } from '../types/theme.type';

export const useApplyTheme = (): ResolvedTheme => {
  const resolvedTheme = useResolvedTheme();

  useEffect(() => {
    document.documentElement.classList.toggle(THEMES.DARK, resolvedTheme === THEMES.DARK);
  }, [resolvedTheme]);

  return resolvedTheme;
};
