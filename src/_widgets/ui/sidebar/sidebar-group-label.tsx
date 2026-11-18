import { Slot } from 'radix-ui';

import type { SidebarGroupLabelProps } from './types';
import { cn } from '../../lib/cn';

export const SidebarGroupLabel = ({
  className,
  asChild = false,
  ...props
}: SidebarGroupLabelProps) => {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
};
