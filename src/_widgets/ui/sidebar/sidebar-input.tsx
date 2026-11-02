import type { SidebarInputProps } from './types';
import { cn } from '../../lib/cn';
import { Input } from '../input/input';

export const SidebarInput = ({ className, ...props }: SidebarInputProps) => (
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    className={cn('h-9 w-full bg-background shadow-none', className)}
    {...props}
  />
);
