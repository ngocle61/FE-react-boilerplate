import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { cn, Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS, Grid } from '@ui';

import { CALENDAR_WEEK_OPTIONS } from '../../constants/calendar.constant';
import { INTERVENTION_STATUS_DOT_COLOR } from '../../constants/intervention-status.constant';
import type { CalendarMonthSectionProps } from '../../types/calendar-month-section.type';
import {
  formatClockTime,
  formatDayOfMonth,
  formatWeekdayShort,
} from '../../utils/format-date.util';

export const CalendarMonthSection = ({
  rows,
  currentDate,
  onSelect,
}: CalendarMonthSectionProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const today = new Date();

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), CALENDAR_WEEK_OPTIONS),
    end: endOfWeek(endOfMonth(currentDate), CALENDAR_WEEK_OPTIONS),
  });

  return (
    <div className="overflow-hidden rounded-card border border-border bg-card">
      <Grid className="grid-cols-7 border-b border-border">
        {days.slice(0, 7).map((day) => (
          <div
            key={day.toISOString()}
            className="border-r border-border p-2 text-center text-xs font-medium text-muted-foreground last:border-r-0"
          >
            {formatWeekdayShort(day, i18n.language)}
          </div>
        ))}
      </Grid>
      <Grid className="grid-cols-7">
        {days.map((day) => {
          const dayRows = rows
            .filter((row) => row.startsAt && isSameDay(row.startsAt, day))
            .sort((a, b) => (a.startsAt?.getTime() ?? 0) - (b.startsAt?.getTime() ?? 0));
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(day, today);

          return (
            <Flex
              key={day.toISOString()}
              direction={FLEX_DIRECTIONS.COL}
              gap={1}
              className={cn(
                'min-h-28 border-r border-b border-border p-1',
                !isCurrentMonth && 'bg-muted/30',
              )}
            >
              <Flex
                asChild
                align={FLEX_ALIGNMENTS.CENTER}
                justify={FLEX_JUSTIFICATIONS.CENTER}
                className={cn(
                  'self-end text-xs',
                  isCurrentMonth ? 'text-foreground' : 'text-muted-foreground',
                  isToday && 'size-5 rounded-full bg-primary text-primary-foreground',
                )}
              >
                <span>{formatDayOfMonth(day, i18n.language)}</span>
              </Flex>
              <Flex direction={FLEX_DIRECTIONS.COL} gap={0.5} className="max-h-24 overflow-y-auto">
                {dayRows.map((row) => (
                  <Flex
                    key={row.id}
                    asChild
                    align={FLEX_ALIGNMENTS.CENTER}
                    gap={1}
                    className="w-full shrink-0 truncate rounded px-1 py-0.5 text-left text-[10px] hover:bg-accent"
                  >
                    <button type="button" onClick={() => onSelect(row)}>
                      <span
                        className={cn(
                          'size-1.5 shrink-0 rounded-full',
                          INTERVENTION_STATUS_DOT_COLOR[row.status],
                        )}
                        aria-hidden
                      />
                      {row.isUrgent && (
                        <>
                          <StarIcon
                            className="size-2.5 shrink-0 fill-urgent text-urgent"
                            aria-hidden
                          />
                          <span className="sr-only">{t('card.urgent')}</span>
                        </>
                      )}
                      <span className="truncate">
                        {row.startsAt ? `${formatClockTime(row.startsAt, i18n.language)} ` : ''}
                        {row.clientName}
                      </span>
                    </button>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          );
        })}
      </Grid>
    </div>
  );
};
