import { CalendarDaysIcon, LayoutDashboardIcon, MessagesSquareIcon, UsersIcon } from 'lucide-react';

import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';

import {
  NAVIGATION_GROUP_KEYS,
  NAVIGATION_GROUP_LABEL_KEYS,
  NAVIGATION_ITEM_KEYS,
  NAVIGATION_ITEM_LABEL_KEYS,
} from './navigation-keys.constant';
import type { NavigationGroup } from '../types/navigation.type';

export const NAVIGATION_GROUPS: readonly NavigationGroup[] = [
  {
    key: NAVIGATION_GROUP_KEYS.WORKSPACE,
    labelKey: NAVIGATION_GROUP_LABEL_KEYS.WORKSPACE,
    items: [
      {
        key: NAVIGATION_ITEM_KEYS.DASHBOARD,
        labelKey: NAVIGATION_ITEM_LABEL_KEYS.DASHBOARD,
        href: ROUTE_PATHS.DASHBOARD,
        icon: LayoutDashboardIcon,
        access: ROUTE_ACCESS.DASHBOARD,
      },
      {
        key: NAVIGATION_ITEM_KEYS.CHAT,
        labelKey: NAVIGATION_ITEM_LABEL_KEYS.CHAT,
        href: ROUTE_PATHS.CHAT,
        icon: MessagesSquareIcon,
        access: ROUTE_ACCESS.CHAT,
      },
      {
        key: NAVIGATION_ITEM_KEYS.CALENDAR,
        labelKey: NAVIGATION_ITEM_LABEL_KEYS.CALENDAR,
        href: ROUTE_PATHS.CALENDAR,
        icon: CalendarDaysIcon,
        access: ROUTE_ACCESS.CALENDAR,
      },
    ],
  },
  {
    key: NAVIGATION_GROUP_KEYS.ADMINISTRATION,
    labelKey: NAVIGATION_GROUP_LABEL_KEYS.ADMINISTRATION,
    items: [
      {
        key: NAVIGATION_ITEM_KEYS.USERS,
        labelKey: NAVIGATION_ITEM_LABEL_KEYS.USERS,
        href: ROUTE_PATHS.USERS,
        icon: UsersIcon,
        access: ROUTE_ACCESS.USERS,
      },
    ],
  },
];
