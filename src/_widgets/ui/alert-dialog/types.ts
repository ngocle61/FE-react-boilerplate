import type { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import type { ALERT_DIALOG_CONTENT_SIZES } from './constants';
import type { ButtonProps } from '../button/types';

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive.Root>;

export type AlertDialogTriggerProps = ComponentProps<typeof AlertDialogPrimitive.Trigger>;

export type AlertDialogPortalProps = ComponentProps<typeof AlertDialogPrimitive.Portal>;

export type AlertDialogOverlayProps = ComponentProps<typeof AlertDialogPrimitive.Overlay>;

export interface AlertDialogContentProps extends ComponentProps<
  typeof AlertDialogPrimitive.Content
> {
  size?: (typeof ALERT_DIALOG_CONTENT_SIZES)[keyof typeof ALERT_DIALOG_CONTENT_SIZES];
}

export type AlertDialogHeaderProps = ComponentProps<'div'>;

export type AlertDialogFooterProps = ComponentProps<'div'>;

export type AlertDialogMediaProps = ComponentProps<'div'>;

export type AlertDialogTitleProps = ComponentProps<typeof AlertDialogPrimitive.Title>;

export type AlertDialogDescriptionProps = ComponentProps<typeof AlertDialogPrimitive.Description>;

export interface AlertDialogActionProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Action>,
    Pick<ButtonProps, 'variant' | 'size'> {}

export interface AlertDialogCancelProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Cancel>,
    Pick<ButtonProps, 'variant' | 'size'> {}
