import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { LANGUAGES } from '@/core/constants/language.constant';
import { THEMES } from '@/core/constants/theme.constant';

import type { LanguageOption, ThemeOption } from '../types/preference-option.type';

export const THEME_OPTIONS: readonly ThemeOption[] = [
  { value: THEMES.LIGHT, labelKey: 'theme.light', icon: SunIcon },
  { value: THEMES.DARK, labelKey: 'theme.dark', icon: MoonIcon },
  { value: THEMES.SYSTEM, labelKey: 'theme.system', icon: MonitorIcon },
];

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { value: LANGUAGES.EN, label: 'English' },
  { value: LANGUAGES.VI, label: 'Tiếng Việt' },
];
