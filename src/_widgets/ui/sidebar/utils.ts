import type { CSSProperties } from 'react';

import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_SKELETON_MIN_WIDTH,
  SIDEBAR_SKELETON_WIDTH_RANGE,
  SIDEBAR_STATUSES,
  SIDEBAR_WRAPPER_STYLE,
} from './constants';
import type { SidebarStatus } from './types';
import type { TooltipContentProps } from '../tooltip/types';

export const persistSidebarOpen = (open: boolean) => {
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
};

export const isSidebarShortcut = (event: KeyboardEvent) =>
  event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey);

export const toSidebarStatus = (open: boolean): SidebarStatus =>
  open ? SIDEBAR_STATUSES.EXPANDED : SIDEBAR_STATUSES.COLLAPSED;

export const toSidebarWrapperStyle = (style: Maybe<CSSProperties>): CSSProperties => ({
  ...SIDEBAR_WRAPPER_STYLE,
  ...style,
});

export const createSkeletonWidth = () =>
  `${Math.floor(Math.random() * SIDEBAR_SKELETON_WIDTH_RANGE) + SIDEBAR_SKELETON_MIN_WIDTH}%`;

export const toSkeletonStyle = (width: string) => ({ '--skeleton-width': width }) as CSSProperties;

export const toTooltipContentProps = (
  tooltip: string | TooltipContentProps,
): TooltipContentProps => (typeof tooltip === 'string' ? { children: tooltip } : tooltip);
