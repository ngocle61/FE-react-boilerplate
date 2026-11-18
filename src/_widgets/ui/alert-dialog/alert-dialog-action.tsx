import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { AlertDialogActionProps } from './types';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const AlertDialogAction = ({
  className,
  variant = BUTTON_VARIANTS.DEFAULT,
  size = BUTTON_SIZES.DEFAULT,
  ...props
}: AlertDialogActionProps) => (
  <Button variant={variant} size={size} asChild>
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  </Button>
);
