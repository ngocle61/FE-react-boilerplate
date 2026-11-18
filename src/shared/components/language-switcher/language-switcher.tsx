import { LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { changeLanguage } from '@/core/libs/i18n';
import { toLanguage } from '@/core/utils/i18n.util';
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

import { LANGUAGE_OPTIONS } from '../../constants/preference-options.constant';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={BUTTON_VARIANTS.GHOST}
          size={BUTTON_SIZES.ICON_SM}
          aria-label={t('language.label')}
        >
          <LanguagesIcon aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DROPDOWN_MENU_ALIGNMENTS.END} className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('language.label')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={i18n.resolvedLanguage}
            onValueChange={(value) => changeLanguage(toLanguage(value))}
          >
            {LANGUAGE_OPTIONS.map(({ value, label }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
