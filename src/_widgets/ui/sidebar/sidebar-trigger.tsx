import { PanelLeftIcon } from 'lucide-react';

import { SIDEBAR_TOGGLE_LABEL } from './constants';
import type { SidebarTriggerProps } from './types';
import { useSidebar } from './use-sidebar';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const SidebarTrigger = ({
  className,
  onClick,
  label = SIDEBAR_TOGGLE_LABEL,
  variant = BUTTON_VARIANTS.GHOST,
  size = BUTTON_SIZES.ICON_SM,
  ...props
}: SidebarTriggerProps) => {
  const { actions } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        actions.toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon aria-hidden />
      <span className="sr-only">{label}</span>
    </Button>
  );
};
