import { XIcon } from 'lucide-react';
import { Dialog as SheetPrimitive } from 'radix-ui';

import { SHEET_CLOSE_LABEL } from './constants';
import type { SheetCloseButtonProps } from './types';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const SheetCloseButton = ({
  className,
  label = SHEET_CLOSE_LABEL,
  variant = BUTTON_VARIANTS.GHOST,
  size = BUTTON_SIZES.ICON_SM,
  ...props
}: SheetCloseButtonProps) => (
  <SheetPrimitive.Close asChild>
    <Button
      data-slot="sheet-close-button"
      variant={variant}
      size={size}
      className={cn('absolute top-3 right-3', className)}
      {...props}
    >
      <XIcon aria-hidden />
      <span className="sr-only">{label}</span>
    </Button>
  </SheetPrimitive.Close>
);
