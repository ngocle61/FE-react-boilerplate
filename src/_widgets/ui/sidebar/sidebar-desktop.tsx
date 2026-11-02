import { SIDEBAR_STATUSES } from './constants';
import type { SidebarDesktopProps } from './types';
import { useSidebar } from './use-sidebar';
import { sidebarContainerVariants, sidebarGapVariants } from './variant';
import { cn } from '../../lib/cn';

export const SidebarDesktop = ({
  side,
  variant,
  collapsible,
  className,
  children,
  ...props
}: SidebarDesktopProps) => {
  const { state } = useSidebar();

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state.status}
      data-collapsible={state.status === SIDEBAR_STATUSES.COLLAPSED ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div data-slot="sidebar-gap" className={sidebarGapVariants({ variant })} />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(sidebarContainerVariants({ variant }), className)}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-card group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
