import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Flex, FLEX_DIRECTIONS, Grid } from '@ui';

import { CALENDAR_WEEK_OPTIONS } from '../../constants/calendar.constant';
import type { CalendarWeekSectionProps } from '../../types/calendar-week-section.type';
import { formatDayOfMonth, formatWeekdayShort } from '../../utils/format-date.util';
import { InterventionCard } from '../intervention-card';

export const CalendarWeekSection = ({ rows, currentDate, onSelect }: CalendarWeekSectionProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const days = eachDayOfInterval({
    start: startOfWeek(currentDate, CALENDAR_WEEK_OPTIONS),
    end: endOfWeek(currentDate, CALENDAR_WEEK_OPTIONS),
  });

  return (
    <Grid cols={1} gap={2} className="sm:grid-cols-7">
      {days.map((day) => {
        const dayRows = rows
          .filter((row) => row.startsAt && isSameDay(row.startsAt, day))
          .sort((a, b) => (a.startsAt?.getTime() ?? 0) - (b.startsAt?.getTime() ?? 0));

        return (
          <Flex
            key={day.toISOString()}
            direction={FLEX_DIRECTIONS.COL}
            gap={2}
            className="rounded-card border border-border bg-card p-2"
          >
            <div className="text-center text-xs font-medium text-muted-foreground">
              <div>{formatWeekdayShort(day, i18n.language)}</div>
              <div className="text-sm text-foreground">{formatDayOfMonth(day, i18n.language)}</div>
            </div>
            <Flex direction={FLEX_DIRECTIONS.COL} gap={1.5}>
              {dayRows.length === 0 ? (
                <p className="py-2 text-center text-xs text-muted-foreground">
                  {t('week.noItems')}
                </p>
              ) : (
                dayRows.map((row) => (
                  <InterventionCard key={row.id} row={row} onSelect={onSelect} />
                ))
              )}
            </Flex>
          </Flex>
        );
      })}
    </Grid>
  );
};
