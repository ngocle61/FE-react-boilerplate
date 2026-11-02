import type { CSSProperties } from 'react';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';

export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SIDEBAR_WIDTH = '16rem';

export const SIDEBAR_WIDTH_MOBILE = '18rem';

export const SIDEBAR_WIDTH_ICON = '3rem';

export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export const SIDEBAR_STATUSES = {
  EXPANDED: 'expanded',
  COLLAPSED: 'collapsed',
} as const;

export const SIDEBAR_SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const SIDEBAR_VARIANTS = {
  SIDEBAR: 'sidebar',
  FLOATING: 'floating',
  INSET: 'inset',
} as const;

export const SIDEBAR_COLLAPSIBLE_MODES = {
  OFFCANVAS: 'offcanvas',
  ICON: 'icon',
  NONE: 'none',
} as const;

export const SIDEBAR_MENU_BUTTON_VARIANTS = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

export const SIDEBAR_MENU_BUTTON_SIZES = {
  DEFAULT: 'default',
  SM: 'sm',
  LG: 'lg',
} as const;

export const SIDEBAR_MENU_ACTION_VISIBILITY = {
  ALWAYS: 'always',
  HOVER: 'hover',
} as const;

export const SIDEBAR_MENU_SUB_BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const SIDEBAR_TOGGLE_LABEL = 'Toggle sidebar';

export const SIDEBAR_MOBILE_TITLE = 'Sidebar';

export const SIDEBAR_MOBILE_DESCRIPTION = 'Displays the mobile sidebar.';

export const SIDEBAR_CONTEXT_ERROR = 'useSidebar must be used within a SidebarProvider.';

export const SIDEBAR_SKELETON_MIN_WIDTH = 50;

export const SIDEBAR_SKELETON_WIDTH_RANGE = 40;

export const SIDEBAR_WRAPPER_STYLE = {
  '--sidebar-width': SIDEBAR_WIDTH,
  '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
} as CSSProperties;

export const SIDEBAR_MOBILE_STYLE = {
  '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
} as CSSProperties;
