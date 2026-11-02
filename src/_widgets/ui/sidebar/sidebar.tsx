import { SIDEBAR_COLLAPSIBLE_MODES, SIDEBAR_SIDES, SIDEBAR_VARIANTS } from './constants';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarStatic } from './sidebar-static';
import type { SidebarProps } from './types';
import { useSidebar } from './use-sidebar';

export const Sidebar = ({
  side = SIDEBAR_SIDES.LEFT,
  variant = SIDEBAR_VARIANTS.SIDEBAR,
  collapsible = SIDEBAR_COLLAPSIBLE_MODES.OFFCANVAS,
  dir,
  children,
  ...props
}: SidebarProps) => {
  const { state } = useSidebar();

  if (collapsible === SIDEBAR_COLLAPSIBLE_MODES.NONE) {
    return (
      <SidebarStatic dir={dir} {...props}>
        {children}
      </SidebarStatic>
    );
  }

  if (state.isMobile) {
    return (
      <SidebarMobile side={side} dir={dir}>
        {children}
      </SidebarMobile>
    );
  }

  return (
    <SidebarDesktop side={side} variant={variant} collapsible={collapsible} dir={dir} {...props}>
      {children}
    </SidebarDesktop>
  );
};
