import { CalendarDaySection } from './calendar-day-section/calendar-day-section';
import { CalendarMonthSection } from './calendar-month-section';
import { CalendarWeekSection } from './calendar-week-section';
import { CALENDAR_VIEW_MODES } from '../../constants/calendar-view.constant';
import type { CalendarViewSectionProps } from '../../types/calendar-view-section.type';

export const CalendarViewSection = ({
  view,
  rows,
  technicians,
  currentDate,
  combined,
  onSelect,
  onReschedule,
  onRescheduleTime,
}: CalendarViewSectionProps) => {
  switch (view) {
    case CALENDAR_VIEW_MODES.WEEK:
      return (
        <div className="h-full min-h-0 overflow-y-auto">
          <CalendarWeekSection rows={rows} currentDate={currentDate} onSelect={onSelect} />
        </div>
      );

    case CALENDAR_VIEW_MODES.MONTH:
      return (
        <div className="h-full min-h-0 overflow-y-auto">
          <CalendarMonthSection rows={rows} currentDate={currentDate} onSelect={onSelect} />
        </div>
      );

    default:
      return (
        <CalendarDaySection
          rows={rows}
          technicians={technicians}
          currentDate={currentDate}
          combined={combined}
          onSelect={onSelect}
          onReschedule={onReschedule}
          onRescheduleTime={onRescheduleTime}
        />
      );
  }
};
