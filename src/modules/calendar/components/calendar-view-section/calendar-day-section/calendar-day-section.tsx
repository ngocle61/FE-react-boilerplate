import {
  cn,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_JUSTIFICATIONS,
  SCROLL_BAR_ORIENTATIONS,
  ScrollArea,
  ScrollBar,
} from '@ui';

import { CombinedScheduleList } from './combined-schedule-list';
import { TechnicianScheduleList } from './technician-schedule-list';
import type { CalendarDaySectionProps } from '../../../types/calendar-day-section.type';
import { groupRowsByTechnician } from '../../../utils/technician-rows.util';
import { getHourMarks, HOUR_ROW_HEIGHT_PX } from '../../../utils/time-grid.util';

export const CalendarDaySection = ({
  rows,
  technicians,
  currentDate,
  combined,
  onSelect,
  onReschedule,
  onRescheduleTime,
}: CalendarDaySectionProps) => {
  const hours = getHourMarks();
  const rowsByTechnician = groupRowsByTechnician(rows);

  return (
    <div className="relative h-[70svh] min-h-0 overflow-hidden rounded-card border border-border bg-card lg:h-full">
      <ScrollArea className="h-full w-full">
        <Flex className={cn(combined && 'pt-3')}>
          <div className="sticky left-0 z-20 w-14 shrink-0 border-r border-border bg-card">
            {!combined && <div className="sticky top-0 z-10 h-11 border-b border-border bg-card" />}
            {hours.map((hour) => (
              <Flex
                key={hour}
                align={FLEX_ALIGNMENTS.START}
                justify={FLEX_JUSTIFICATIONS.END}
                className="pt-0.5 pr-2 text-xs text-muted-foreground"
                style={{ height: HOUR_ROW_HEIGHT_PX }}
              >
                {String(hour).padStart(2, '0')}:00
              </Flex>
            ))}
          </div>
          {combined ? (
            <CombinedScheduleList
              rows={rows}
              day={currentDate}
              onSelect={onSelect}
              onDropIntervention={onRescheduleTime}
            />
          ) : (
            technicians.map((technician) => (
              <TechnicianScheduleList
                key={technician.id}
                technician={technician}
                rows={rowsByTechnician.get(technician.id) ?? []}
                day={currentDate}
                onSelect={onSelect}
                onDropIntervention={onReschedule}
              />
            ))
          )}
        </Flex>
        <ScrollBar orientation={SCROLL_BAR_ORIENTATIONS.HORIZONTAL} />
      </ScrollArea>
    </div>
  );
};
