import { Select as SelectPrimitive } from 'radix-ui';

import { SELECT_CONTENT_ALIGNMENTS, SELECT_CONTENT_POSITIONS } from './constants';
import { SelectScrollDownButton } from './select-scroll-down-button';
import { SelectScrollUpButton } from './select-scroll-up-button';
import type { SelectContentProps } from './types';
import { cn } from '../../lib/cn';

export const SelectContent = ({
  className,
  children,
  position = SELECT_CONTENT_POSITIONS.POPPER,
  align = SELECT_CONTENT_ALIGNMENTS.START,
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      data-position={position}
      className={cn(
        'relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-toast duration-100 data-[side=bottom]:slide-in-from-top-2 data-[position=popper]:data-[side=bottom]:translate-y-1 data-[side=left]:slide-in-from-right-2 data-[position=popper]:data-[side=left]:-translate-x-1 data-[side=right]:slide-in-from-left-2 data-[position=popper]:data-[side=right]:translate-x-1 data-[side=top]:slide-in-from-bottom-2 data-[position=popper]:data-[side=top]:-translate-y-1 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className,
      )}
      position={position}
      align={align}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        data-position={position}
        className="p-1 data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)"
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
