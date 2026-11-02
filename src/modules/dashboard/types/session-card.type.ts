import type { LucideIcon } from 'lucide-react';

import type { TranslationKey } from '@/core/types/language.type';
import type { BadgeProps } from '@ui';

export interface PermissionResourceMeta {
  icon: LucideIcon;
  labelKey: TranslationKey;
}

export interface PermissionActionMeta {
  icon: LucideIcon;
  variant: BadgeProps['variant'];
}

export interface PermissionGroup {
  resource: string;
  actions: string[];
}
