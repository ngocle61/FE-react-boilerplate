import type { VariantProps } from 'class-variance-authority';
import type { Dialog as SheetPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { sheetContentVariants } from './variant';
import type { ButtonProps } from '../button/types';

export type SheetProps = ComponentProps<typeof SheetPrimitive.Root>;

export type SheetTriggerProps = ComponentProps<typeof SheetPrimitive.Trigger>;

export type SheetCloseProps = ComponentProps<typeof SheetPrimitive.Close>;

export type SheetPortalProps = ComponentProps<typeof SheetPrimitive.Portal>;

export type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>;

export interface SheetContentProps
  extends
    ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {}

export interface SheetCloseButtonProps extends Omit<ButtonProps, 'asChild'> {
  label?: string;
}

export type SheetHeaderProps = ComponentProps<'div'>;

export type SheetFooterProps = ComponentProps<'div'>;

export type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>;

export type SheetDescriptionProps = ComponentProps<typeof SheetPrimitive.Description>;
