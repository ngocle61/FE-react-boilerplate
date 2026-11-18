import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogCancelProps } from './types';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const AlertDialogCancel = ({
  className,
  variant = BUTTON_VARIANTS.OUTLINE,
  size = BUTTON_SIZES.DEFAULT,
  ...props
}: AlertDialogCancelProps) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      {...props}
    />
  </Button>
);
