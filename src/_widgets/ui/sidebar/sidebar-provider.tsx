import { useCallback, useEffect, useMemo, useState, type SetStateAction } from 'react';

import { SidebarContext } from './sidebar-context';
import type { SidebarContextValue, SidebarProviderProps } from './types';
import {
  isSidebarShortcut,
  persistSidebarOpen,
  toSidebarStatus,
  toSidebarWrapperStyle,
} from './utils';
import { useIsMobile } from '../../hooks/use-is-mobile';
import { cn } from '../../lib/cn';

export const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isMobile = useIsMobile();

  const open = openProp ?? internalOpen;

  const setOpen = useCallback(
    (value: SetStateAction<boolean>) => {
      const nextOpen = typeof value === 'function' ? value(open) : value;
      if (onOpenChange) {
        onOpenChange(nextOpen);
      } else {
        setInternalOpen(nextOpen);
      }
      persistSidebarOpen(nextOpen);
    },
    [onOpenChange, open],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current);
      return;
    }
    setOpen((current) => !current);
  }, [isMobile, setOpen]);

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      state: { status: toSidebarStatus(open), open, openMobile, isMobile },
      actions: { setOpen, setOpenMobile, toggleSidebar },
    }),
    [open, openMobile, isMobile, setOpen, toggleSidebar],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isSidebarShortcut(event)) return;
      event.preventDefault();
      toggleSidebar();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={toSidebarWrapperStyle(style)}
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  );
};
