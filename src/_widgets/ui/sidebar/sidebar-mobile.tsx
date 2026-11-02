import {
  SIDEBAR_MOBILE_DESCRIPTION,
  SIDEBAR_MOBILE_STYLE,
  SIDEBAR_MOBILE_TITLE,
} from './constants';
import type { SidebarMobileProps } from './types';
import { useSidebar } from './use-sidebar';
import { Sheet } from '../sheet/sheet';
import { SheetContent } from '../sheet/sheet-content';
import { SheetDescription } from '../sheet/sheet-description';
import { SheetHeader } from '../sheet/sheet-header';
import { SheetTitle } from '../sheet/sheet-title';

export const SidebarMobile = ({ side, dir, children }: SidebarMobileProps) => {
  const { state, actions } = useSidebar();

  return (
    <Sheet open={state.openMobile} onOpenChange={actions.setOpenMobile}>
      <SheetContent
        dir={dir}
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        side={side}
        style={SIDEBAR_MOBILE_STYLE}
        className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{SIDEBAR_MOBILE_TITLE}</SheetTitle>
          <SheetDescription>{SIDEBAR_MOBILE_DESCRIPTION}</SheetDescription>
        </SheetHeader>
        <div className="flex size-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
