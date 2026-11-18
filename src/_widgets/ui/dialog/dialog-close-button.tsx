import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_CLOSE_LABEL } from './constants';
import type { DialogCloseButtonProps } from './types';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const DialogCloseButton = ({
  className,
  label = DIALOG_CLOSE_LABEL,
  variant = BUTTON_VARIANTS.GHOST,
  size = BUTTON_SIZES.ICON_SM,
  ...props
}: DialogCloseButtonProps) => (
  <DialogPrimitive.Close asChild>
    <Button
      data-slot="dialog-close-button"
      variant={variant}
      size={size}
      className={cn('absolute top-4 right-4', className)}
      {...props}
    >
      <XIcon aria-hidden />
      <span className="sr-only">{label}</span>
    </Button>
  </DialogPrimitive.Close>
);
