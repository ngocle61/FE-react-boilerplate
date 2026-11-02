import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode, SetStateAction } from 'react';

import type {
  SIDEBAR_COLLAPSIBLE_MODES,
  SIDEBAR_MENU_SUB_BUTTON_SIZES,
  SIDEBAR_SIDES,
  SIDEBAR_STATUSES,
  SIDEBAR_VARIANTS,
} from './constants';
import type { sidebarMenuActionVariants, sidebarMenuButtonVariants } from './variant';
import type { ButtonProps } from '../button/types';
import type { InputProps } from '../input/types';
import type { SeparatorProps } from '../separator/types';
import type { TooltipContentProps } from '../tooltip/types';

export type SidebarStatus = (typeof SIDEBAR_STATUSES)[keyof typeof SIDEBAR_STATUSES];

export type SidebarSide = (typeof SIDEBAR_SIDES)[keyof typeof SIDEBAR_SIDES];

export type SidebarVariant = (typeof SIDEBAR_VARIANTS)[keyof typeof SIDEBAR_VARIANTS];

export type SidebarCollapsible =
  (typeof SIDEBAR_COLLAPSIBLE_MODES)[keyof typeof SIDEBAR_COLLAPSIBLE_MODES];

export interface SidebarState {
  status: SidebarStatus;
  open: boolean;
  openMobile: boolean;
  isMobile: boolean;
}

export interface SidebarActions {
  setOpen: (value: SetStateAction<boolean>) => void;
  setOpenMobile: (value: SetStateAction<boolean>) => void;
  toggleSidebar: () => void;
}

export interface SidebarContextValue {
  state: SidebarState;
  actions: SidebarActions;
}

export interface SidebarProviderProps extends ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps extends ComponentProps<'div'> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

export type SidebarStaticProps = ComponentProps<'div'>;

export interface SidebarMobileProps {
  side: SidebarSide;
  dir?: string;
  children?: ReactNode;
}

export interface SidebarDesktopProps extends ComponentProps<'div'> {
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
}

export interface SidebarTriggerProps extends ButtonProps {
  label?: string;
}

export interface SidebarRailProps extends ComponentProps<'button'> {
  label?: string;
}

export type SidebarInsetProps = ComponentProps<'div'>;

export type SidebarInputProps = InputProps;

export type SidebarHeaderProps = ComponentProps<'div'>;

export type SidebarFooterProps = ComponentProps<'div'>;

export type SidebarSeparatorProps = SeparatorProps;

export type SidebarContentProps = ComponentProps<'div'>;

export type SidebarGroupProps = ComponentProps<'div'>;

export interface SidebarGroupLabelProps extends ComponentProps<'div'> {
  asChild?: boolean;
}

export interface SidebarGroupActionProps extends ComponentProps<'button'> {
  asChild?: boolean;
}

export type SidebarGroupContentProps = ComponentProps<'div'>;

export type SidebarMenuProps = ComponentProps<'ul'>;

export type SidebarMenuItemProps = ComponentProps<'li'>;

export interface SidebarMenuButtonProps
  extends ComponentProps<'button'>, VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | TooltipContentProps;
}

export interface SidebarMenuActionProps
  extends ComponentProps<'button'>, VariantProps<typeof sidebarMenuActionVariants> {
  asChild?: boolean;
}

export type SidebarMenuBadgeProps = ComponentProps<'div'>;

export type SidebarMenuSkeletonProps = ComponentProps<'div'>;

export type SidebarMenuSubProps = ComponentProps<'ul'>;

export type SidebarMenuSubItemProps = ComponentProps<'li'>;

export interface SidebarMenuSubButtonProps extends ComponentProps<'a'> {
  asChild?: boolean;
  size?: (typeof SIDEBAR_MENU_SUB_BUTTON_SIZES)[keyof typeof SIDEBAR_MENU_SUB_BUTTON_SIZES];
  isActive?: boolean;
}
