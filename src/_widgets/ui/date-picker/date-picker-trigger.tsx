import { CalendarIcon } from 'lucide-react';

import type { DatePickerTriggerProps } from './types';
import { cn } from '../../lib/cn';
import { ICON_PLACEMENTS } from '../../lib/constants';
import { Button } from '../button/button';
import { BUTTON_VARIANTS } from '../button/constants';

export const DatePickerTrigger = ({ className, children, ...props }: DatePickerTriggerProps) => (
  <Button
    type="button"
    variant={BUTTON_VARIANTS.OUTLINE}
    data-slot="date-picker-trigger"
    className={cn('h-input w-full justify-start px-3 text-left font-normal', className)}
    {...props}
  >
    <CalendarIcon
      aria-hidden
      data-icon={ICON_PLACEMENTS.INLINE_START}
      className="text-muted-foreground"
    />
    <span className="truncate">{children}</span>
  </Button>
);
