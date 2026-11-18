import type { SidebarFooterProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => (
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);
