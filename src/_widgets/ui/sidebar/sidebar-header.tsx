import type { SidebarHeaderProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);
