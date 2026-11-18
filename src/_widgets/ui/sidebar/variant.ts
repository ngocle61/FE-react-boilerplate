import { cva } from 'class-variance-authority';

import {
  SIDEBAR_MENU_ACTION_VISIBILITY,
  SIDEBAR_MENU_BUTTON_SIZES,
  SIDEBAR_MENU_BUTTON_VARIANTS,
  SIDEBAR_VARIANTS,
} from './constants';

export const sidebarGapVariants = cva(
  'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180',
  {
    variants: {
      variant: {
        [SIDEBAR_VARIANTS.SIDEBAR]: 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        [SIDEBAR_VARIANTS.FLOATING]:
          'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
        [SIDEBAR_VARIANTS.INSET]:
          'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
      },
    },
    defaultVariants: {
      variant: SIDEBAR_VARIANTS.SIDEBAR,
    },
  },
);

export const sidebarContainerVariants = cva(
  'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex',
  {
    variants: {
      variant: {
        [SIDEBAR_VARIANTS.SIDEBAR]:
          'border-sidebar-border group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
        [SIDEBAR_VARIANTS.FLOATING]:
          'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]',
        [SIDEBAR_VARIANTS.INSET]:
          'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]',
      },
    },
    defaultVariants: {
      variant: SIDEBAR_VARIANTS.SIDEBAR,
    },
  },
);

export const sidebarMenuButtonVariants = cva(
  'peer/menu-button group/menu-button flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-semibold data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
  {
    variants: {
      variant: {
        [SIDEBAR_MENU_BUTTON_VARIANTS.DEFAULT]:
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        [SIDEBAR_MENU_BUTTON_VARIANTS.OUTLINE]:
          'bg-background ring-1 ring-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      },
      size: {
        [SIDEBAR_MENU_BUTTON_SIZES.DEFAULT]: 'h-9 text-sm',
        [SIDEBAR_MENU_BUTTON_SIZES.SM]: 'h-7 text-xs',
        [SIDEBAR_MENU_BUTTON_SIZES.LG]: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: SIDEBAR_MENU_BUTTON_VARIANTS.DEFAULT,
      size: SIDEBAR_MENU_BUTTON_SIZES.DEFAULT,
    },
  },
);

export const sidebarMenuActionVariants = cva(
  'absolute top-2 right-1 flex aspect-square w-5 cursor-pointer items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=lg]/menu-button:top-3.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      visibility: {
        [SIDEBAR_MENU_ACTION_VISIBILITY.ALWAYS]: '',
        [SIDEBAR_MENU_ACTION_VISIBILITY.HOVER]:
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0',
      },
    },
    defaultVariants: {
      visibility: SIDEBAR_MENU_ACTION_VISIBILITY.ALWAYS,
    },
  },
);
