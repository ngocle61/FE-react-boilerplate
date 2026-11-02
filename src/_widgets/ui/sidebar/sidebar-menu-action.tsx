import { Slot } from 'radix-ui';

import { SIDEBAR_MENU_ACTION_VISIBILITY } from './constants';
import type { SidebarMenuActionProps } from './types';
import { sidebarMenuActionVariants } from './variant';
import { cn } from '../../lib/cn';

export const SidebarMenuAction = ({
  className,
  asChild = false,
  visibility = SIDEBAR_MENU_ACTION_VISIBILITY.ALWAYS,
  ...props
}: SidebarMenuActionProps) => {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(sidebarMenuActionVariants({ visibility }), className)}
      {...props}
    />
  );
};
