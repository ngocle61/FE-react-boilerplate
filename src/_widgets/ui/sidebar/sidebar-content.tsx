import type { SidebarContentProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    className={cn(
      'flex scrollbar-thin min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      className,
    )}
    {...props}
  />
);
