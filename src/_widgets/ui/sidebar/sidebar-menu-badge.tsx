import type { SidebarMenuBadgeProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarMenuBadge = ({ className, ...props }: SidebarMenuBadgeProps) => (
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    className={cn(
      'pointer-events-none absolute top-2 right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground',
      className,
    )}
    {...props}
  />
);
