import type { SidebarMenuSubItemProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarMenuSubItem = ({ className, ...props }: SidebarMenuSubItemProps) => (
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    className={cn('group/menu-sub-item relative', className)}
    {...props}
  />
);
