import type { SidebarMenuProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => (
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-0.5', className)}
    {...props}
  />
);
