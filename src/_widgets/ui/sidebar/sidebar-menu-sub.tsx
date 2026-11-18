import type { SidebarMenuSubProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarMenuSub = ({ className, ...props }: SidebarMenuSubProps) => (
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    className={cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
);
