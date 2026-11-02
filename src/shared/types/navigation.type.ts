import type { LucideIcon } from 'lucide-react';

import type { AccessRequirement } from '@/core/types/access.type';
import type { TranslationKey } from '@/core/types/language.type';

export interface NavigationItem {
  key: string;
  labelKey: TranslationKey;
  href: string;
  icon: LucideIcon;
  access: AccessRequirement;
}

export interface NavigationGroup {
  key: string;
  labelKey: TranslationKey;
  items: readonly NavigationItem[];
}
