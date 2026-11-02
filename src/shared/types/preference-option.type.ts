import type { LucideIcon } from 'lucide-react';

import type { Language, TranslationKey } from '@/core/types/language.type';
import type { Theme } from '@/core/types/theme.type';

export interface ThemeOption {
  value: Theme;
  labelKey: TranslationKey;
  icon: LucideIcon;
}

export interface LanguageOption {
  value: Language;
  label: string;
}
