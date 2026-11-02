import type { NavigationGroup } from '../../types/navigation.type';

export interface AppSidebarProps {
  onSignOut: () => void;
}

export interface AppSidebarNavProps {
  groups: readonly NavigationGroup[];
}

export interface AppSidebarUserProps {
  onSignOut: () => void;
}
