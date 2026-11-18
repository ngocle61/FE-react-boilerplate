import { ChevronLeftIcon, ChevronRightIcon, InboxIcon, PlusIcon, UsersIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { Can } from '@/shared/components/can/can';
import {
  Badge,
  BADGE_VARIANTS,
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_JUSTIFICATIONS,
  ICON_PLACEMENTS,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@ui';

import { CALENDAR_VIEW_MODES } from '../constants/calendar-view.constant';
import { CALENDAR_VIEW_MODE_OPTIONS } from '../constants/calendar.constant';
import type { CalendarToolbarProps } from '../types/calendar-toolbar.type';
import type { CalendarViewMode } from '../types/calendar-view.type';
import { formatCalendarLabel } from '../utils/format-date.util';

export const CalendarToolbar = ({
  view,
  onViewChange,
  currentDate,
  onNavigate,
  onToday,
  onNewClick,
  isCombinedView,
  onToggleCombinedView,
  unscheduledCount,
  isUnscheduledOpen,
  onToggleUnscheduled,
}: CalendarToolbarProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <Flex align={FLEX_ALIGNMENTS.CENTER} justify={FLEX_JUSTIFICATIONS.BETWEEN} gap={3} wrap>
      <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
        <Button
          variant={BUTTON_VARIANTS.OUTLINE}
          size={BUTTON_SIZES.ICON}
          onClick={() => onNavigate(-1)}
          aria-label={t('toolbar.previous')}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant={BUTTON_VARIANTS.OUTLINE}
          size={BUTTON_SIZES.ICON}
          onClick={() => onNavigate(1)}
          aria-label={t('toolbar.next')}
        >
          <ChevronRightIcon />
        </Button>
        <Button variant={BUTTON_VARIANTS.OUTLINE} onClick={onToday}>
          {t('toolbar.today')}
        </Button>
        <span className="ml-1 text-sm font-medium text-foreground capitalize">
          {formatCalendarLabel(currentDate, view, i18n.language)}
        </span>
      </Flex>
      <Flex align={FLEX_ALIGNMENTS.CENTER} gap={3} wrap>
        <Button
          variant={isUnscheduledOpen ? BUTTON_VARIANTS.DEFAULT : BUTTON_VARIANTS.OUTLINE}
          size={BUTTON_SIZES.SM}
          onClick={onToggleUnscheduled}
          aria-pressed={isUnscheduledOpen}
        >
          <InboxIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
          {t('toolbar.toSchedule')}
          <Badge variant={BADGE_VARIANTS.SECONDARY} className="h-5 px-1.5">
            {unscheduledCount}
          </Badge>
        </Button>
        {view === CALENDAR_VIEW_MODES.DAY && (
          <Button
            variant={isCombinedView ? BUTTON_VARIANTS.DEFAULT : BUTTON_VARIANTS.OUTLINE}
            size={BUTTON_SIZES.SM}
            onClick={onToggleCombinedView}
          >
            <UsersIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
            {t('toolbar.combinedView')}
          </Button>
        )}
        <Tabs value={view} onValueChange={(value) => onViewChange(value as CalendarViewMode)}>
          <TabsList>
            {CALENDAR_VIEW_MODE_OPTIONS.map((mode) => (
              <TabsTrigger key={mode} value={mode}>
                {t(`toolbar.view.${mode}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Can permissions={[PERMISSIONS.CALENDAR_MANAGE]}>
          <Button onClick={onNewClick}>
            <PlusIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
            {t('toolbar.newIntervention')}
          </Button>
        </Can>
      </Flex>
    </Flex>
  );
};
