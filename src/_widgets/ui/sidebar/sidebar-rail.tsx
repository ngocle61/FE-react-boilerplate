import { SIDEBAR_TOGGLE_LABEL } from './constants';
import type { SidebarRailProps } from './types';
import { useSidebar } from './use-sidebar';
import { cn } from '../../lib/cn';

export const SidebarRail = ({
  className,
  label = SIDEBAR_TOGGLE_LABEL,
  ...props
}: SidebarRailProps) => {
  const { actions } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label={label}
      tabIndex={-1}
      title={label}
      onClick={actions.toggleSidebar}
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-0.5 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar hover:after:bg-sidebar-border in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2 [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-collapsible=offcanvas]_&]:-left-2 [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        className,
      )}
      {...props}
    />
  );
};
