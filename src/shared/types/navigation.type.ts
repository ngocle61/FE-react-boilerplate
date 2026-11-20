import type { LucideIcon } from 'lucide-react';

import type { AccessRequirement } from '@/core/types/access.type';
import type { TranslationKey } from '@/core/types/language.type';

export interface NavigationLink {
  key: string;
  labelKey: TranslationKey;
  href: string;
  access: AccessRequirement;
}

export interface NavigationLeafItem extends NavigationLink {
  icon: LucideIcon;
}

export interface NavigationParentItem {
  key: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
  children: readonly NavigationLink[];
}

export type NavigationItem = NavigationLeafItem | NavigationParentItem;

export interface NavigationGroup {
  key: string;
  labelKey: TranslationKey;
  items: readonly NavigationItem[];
}
