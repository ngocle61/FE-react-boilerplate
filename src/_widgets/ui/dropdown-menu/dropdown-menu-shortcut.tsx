import type { DropdownMenuShortcutProps } from './types';
import { cn } from '../../lib/cn';

export const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => (
  <span
    data-slot="dropdown-menu-shortcut"
    className={cn(
      'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
      className,
    )}
    {...props}
  />
);
