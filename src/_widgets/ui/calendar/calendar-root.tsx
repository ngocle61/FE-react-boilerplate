import type { CalendarRootProps } from './types';
import { cn } from '../../lib/cn';

export const CalendarRoot = ({ className, rootRef, ...props }: CalendarRootProps) => (
  <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
);
