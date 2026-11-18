import type { SidebarMenuItemProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
);
