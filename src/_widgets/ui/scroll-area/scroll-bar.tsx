import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

import { SCROLL_BAR_ORIENTATIONS } from './constants';
import type { ScrollBarProps } from './types';
import { cn } from '../../lib/cn';

export const ScrollBar = ({
  className,
  orientation = SCROLL_BAR_ORIENTATIONS.VERTICAL,
  ...props
}: ScrollBarProps) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    data-orientation={orientation}
    orientation={orientation}
    className={cn(
      'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className="relative flex-1 rounded-full bg-border"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);
