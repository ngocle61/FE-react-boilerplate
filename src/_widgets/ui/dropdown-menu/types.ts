import type { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { DROPDOWN_MENU_ITEM_VARIANTS } from './constants';

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>;

export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal>;

export type DropdownMenuTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.Trigger>;

export type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content>;

export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>;

export interface DropdownMenuItemProps extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
  variant?: (typeof DROPDOWN_MENU_ITEM_VARIANTS)[keyof typeof DROPDOWN_MENU_ITEM_VARIANTS];
}

export type DropdownMenuCheckboxItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;

export type DropdownMenuRadioItemProps = ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;

export type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive.Label>;

export type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuPrimitive.Separator>;

export type DropdownMenuShortcutProps = ComponentProps<'span'>;

export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>;

export type DropdownMenuSubTriggerProps = ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>;

export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuPrimitive.SubContent>;
