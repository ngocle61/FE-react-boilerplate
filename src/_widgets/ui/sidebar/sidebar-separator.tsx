import type { SidebarSeparatorProps } from './types';
import { cn } from '../../lib/cn';
import { Separator } from '../separator/separator';

export const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    className={cn('mx-2 w-auto bg-sidebar-border', className)}
    {...props}
  />
);
