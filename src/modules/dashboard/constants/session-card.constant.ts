import {
  CalendarDaysIcon,
  CircleCheckIcon,
  EyeIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react';

import { PERMISSION_ACTIONS, PERMISSION_RESOURCES } from '@/core/constants/permissions.constant';
import { NAVIGATION_ITEM_LABEL_KEYS } from '@/shared/constants/navigation-keys.constant';
import { BADGE_VARIANTS } from '@ui';

import type { PermissionActionMeta, PermissionResourceMeta } from '../types/session-card.type';

export const PERMISSION_RESOURCE_META: Record<string, PermissionResourceMeta> = {
  [PERMISSION_RESOURCES.DASHBOARD]: {
    icon: LayoutDashboardIcon,
    labelKey: NAVIGATION_ITEM_LABEL_KEYS.DASHBOARD,
  },
  [PERMISSION_RESOURCES.CHAT]: {
    icon: MessagesSquareIcon,
    labelKey: NAVIGATION_ITEM_LABEL_KEYS.CHAT,
  },
  [PERMISSION_RESOURCES.CALENDAR]: {
    icon: CalendarDaysIcon,
    labelKey: NAVIGATION_ITEM_LABEL_KEYS.CALENDAR,
  },
  [PERMISSION_RESOURCES.USER]: { icon: UsersIcon, labelKey: NAVIGATION_ITEM_LABEL_KEYS.USERS },
};

export const PERMISSION_ACTION_META: Record<string, PermissionActionMeta> = {
  [PERMISSION_ACTIONS.VIEW]: { icon: EyeIcon, variant: BADGE_VARIANTS.INFO },
  [PERMISSION_ACTIONS.USE]: { icon: CircleCheckIcon, variant: BADGE_VARIANTS.SECONDARY },
  [PERMISSION_ACTIONS.MANAGE]: { icon: ShieldCheckIcon, variant: BADGE_VARIANTS.WARNING },
};

export const PERMISSION_FALLBACK_ICON = ShieldCheckIcon;

export const PERMISSION_FALLBACK_BADGE_VARIANT = BADGE_VARIANTS.SECONDARY;

export const SESSION_ROLE_BADGE_VARIANT = BADGE_VARIANTS.SECONDARY;
