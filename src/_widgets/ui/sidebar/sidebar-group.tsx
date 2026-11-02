import type { SidebarGroupProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => (
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
    {...props}
  />
);
