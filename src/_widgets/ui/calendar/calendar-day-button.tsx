import { useEffect, useRef } from 'react';
import { getDefaultClassNames } from 'react-day-picker';

import type { CalendarDayButtonProps } from './types';
import { isSingleDaySelected } from './utils';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const CalendarDayButton = ({
  className,
  day,
  modifiers,
  ...props
}: CalendarDayButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant={BUTTON_VARIANTS.GHOST}
      size={BUTTON_SIZES.ICON_SM}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSingleDaySelected(modifiers)}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal shadow-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-3 group-data-[focused=true]/day:ring-ring/40 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground [&>span]:text-xs [&>span]:opacity-70',
        getDefaultClassNames().day,
        className,
      )}
      {...props}
    />
  );
};
