import { Slot } from 'radix-ui';

import {
  SIDEBAR_MENU_BUTTON_SIZES,
  SIDEBAR_MENU_BUTTON_VARIANTS,
  SIDEBAR_STATUSES,
} from './constants';
import type { SidebarMenuButtonProps } from './types';
import { useSidebar } from './use-sidebar';
import { toTooltipContentProps } from './utils';
import { sidebarMenuButtonVariants } from './variant';
import { cn } from '../../lib/cn';
import { TOOLTIP_ALIGNMENTS, TOOLTIP_SIDES } from '../tooltip/constants';
import { Tooltip } from '../tooltip/tooltip';
import { TooltipContent } from '../tooltip/tooltip-content';
import { TooltipTrigger } from '../tooltip/tooltip-trigger';

export const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = SIDEBAR_MENU_BUTTON_VARIANTS.DEFAULT,
  size = SIDEBAR_MENU_BUTTON_SIZES.DEFAULT,
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const { state } = useSidebar();

  const Comp = asChild ? Slot.Root : 'button';

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side={TOOLTIP_SIDES.RIGHT}
        align={TOOLTIP_ALIGNMENTS.CENTER}
        hidden={state.status !== SIDEBAR_STATUSES.COLLAPSED || state.isMobile}
        {...toTooltipContentProps(tooltip)}
      />
    </Tooltip>
  );
};
