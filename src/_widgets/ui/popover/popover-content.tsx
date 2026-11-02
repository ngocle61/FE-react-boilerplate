import { Popover as PopoverPrimitive } from 'radix-ui';

import { POPOVER_ALIGNMENTS, POPOVER_SIDE_OFFSET } from './constants';
import type { PopoverContentProps } from './types';
import { cn } from '../../lib/cn';

export const PopoverContent = ({
  className,
  align = POPOVER_ALIGNMENTS.CENTER,
  sideOffset = POPOVER_SIDE_OFFSET,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg border border-border bg-popover p-3 text-sm text-popover-foreground shadow-toast outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
