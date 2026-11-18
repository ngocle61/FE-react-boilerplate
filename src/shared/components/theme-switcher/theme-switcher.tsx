import { MoonIcon, SunIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { THEMES } from '@/core/constants/theme.constant';
import { useResolvedTheme } from '@/core/hooks/use-resolved-theme';
import { useTheme, useThemeActions } from '@/core/store/theme.store';
import { toTheme } from '@/core/utils/theme.util';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DROPDOWN_MENU_ALIGNMENTS,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@ui';

import { THEME_OPTIONS } from '../../constants/preference-options.constant';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const resolvedTheme = useResolvedTheme();
  const { setTheme } = useThemeActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.ICON_SM}
          aria-label={t('theme.label')}
        >
          {resolvedTheme === THEMES.DARK ? <MoonIcon aria-hidden /> : <SunIcon aria-hidden />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DROPDOWN_MENU_ALIGNMENTS.END} className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('theme.label')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(toTheme(value))}>
            {THEME_OPTIONS.map(({ value, labelKey, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon />
                {t(labelKey)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
