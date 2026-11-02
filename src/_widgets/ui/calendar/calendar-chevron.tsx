import { CALENDAR_CHEVRON_ICONS, CALENDAR_CHEVRON_ORIENTATIONS } from './constants';
import type { CalendarChevronProps } from './types';
import { cn } from '../../lib/cn';

export const CalendarChevron = ({
  className,
  orientation = CALENDAR_CHEVRON_ORIENTATIONS.DOWN,
  disabled: _disabled,
  size: _size,
  ...props
}: CalendarChevronProps) => {
  const Icon = CALENDAR_CHEVRON_ICONS[orientation];

  return <Icon aria-hidden className={cn('size-4', className)} {...props} />;
};
