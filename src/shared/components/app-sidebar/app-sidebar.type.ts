import type { NavigationGroup, NavigationParentItem } from '../../types/navigation.type';

export interface AppSidebarProps {
  onSignOut: () => void;
}

export interface AppSidebarNavProps {
  groups: readonly NavigationGroup[];
}

export interface AppSidebarNavParentProps {
  item: NavigationParentItem;
}

export interface AppSidebarUserProps {
  onSignOut: () => void;
}
