import { DayPicker } from 'react-day-picker';

import { CalendarChevron } from './calendar-chevron';
import { CalendarDayButton } from './calendar-day-button';
import { CalendarRoot } from './calendar-root';
import { CalendarWeekNumber } from './calendar-week-number';
import { CALENDAR_CAPTION_LAYOUTS } from './constants';
import type { CalendarProps } from './types';
import { toCalendarClassNames, toCalendarFormatters } from './utils';
import { cn } from '../../lib/cn';
import { BUTTON_VARIANTS } from '../button/constants';

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = CALENDAR_CAPTION_LAYOUTS.LABEL,
  buttonVariant = BUTTON_VARIANTS.GHOST,
  locale,
  formatters,
  components,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn(
      'group/calendar bg-background p-3 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(9)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
      String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
      String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
      className,
    )}
    captionLayout={captionLayout}
    locale={locale}
    formatters={toCalendarFormatters(locale, formatters)}
    classNames={toCalendarClassNames({
      captionLayout,
      buttonVariant,
      showWeekNumber: props.showWeekNumber,
      classNames,
    })}
    components={{
      Root: CalendarRoot,
      Chevron: CalendarChevron,
      DayButton: CalendarDayButton,
      WeekNumber: CalendarWeekNumber,
      ...components,
    }}
    {...props}
  />
);
