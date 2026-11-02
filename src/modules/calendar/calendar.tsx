import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import type { UpdateInterventionPayload } from '@/core/types/intervention.dto';
import type { TranslationKey } from '@/core/types/language.type';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@/shared/components/page-header/page-header';
import { QueryState } from '@/shared/components/query-state/query-state';
import { useDialogTarget } from '@/shared/hooks/use-dialog-target';
import { useHistoryRestoreKey } from '@/shared/hooks/use-history-restore-key';
import { useSearchParamsState } from '@/shared/hooks/use-search-params-state';
import { Flex, FLEX_DIRECTIONS, Grid } from '@ui';

import { CalendarFilters } from './components/calendar-filters';
import { CalendarToolbar } from './components/calendar-toolbar';
import { CalendarViewSection } from './components/calendar-view-section/calendar-view-section';
import { InterventionDialogs } from './components/intervention-dialogs/intervention-dialogs';
import { UnscheduledPanel } from './components/unscheduled-panel';
import { INTERVENTION_DIALOG_MODES } from './constants/intervention-dialog.constant';
import { calendarFilterConverter } from './converters/calendar-filter.converter';
import { useInterventionsQuery } from './hooks/use-interventions-query';
import { useOptimisticScheduleRows } from './hooks/use-optimistic-schedule-rows';
import { useTechniciansQuery } from './hooks/use-technicians-query';
import { useUnscheduledInterventionsQuery } from './hooks/use-unscheduled-interventions-query';
import { useUpdateIntervention } from './hooks/use-update-intervention';
import { calendarSearchSchema } from './schema/calendar-search.schema';
import type { InterventionDialogTarget } from './types/intervention-dialogs.type';
import type { InterventionRow } from './types/intervention-row.type';
import { filterInterventionRows, filterTechnicians } from './utils/calendar-filter.util';
import { getViewRange, parseDateParam, shiftDate, toDateParam } from './utils/calendar-range.util';
import { isUnchangedSchedule } from './utils/reschedule.util';

export const CalendarPage = () => {
  const [isCombinedView, setIsCombinedView] = useState(false);
  const [isUnscheduledOpen, setIsUnscheduledOpen] = useState(false);

  const { t } = useTranslation([I18N_NAMESPACES.CALENDAR, I18N_NAMESPACES.COMMON]);
  const { state: searchState, setState: setSearchState } =
    useSearchParamsState(calendarSearchSchema);
  const restoreKey = useHistoryRestoreKey();
  const interventionDialog = useDialogTarget<InterventionDialogTarget>();

  const { view } = searchState;
  const currentDate = parseDateParam(searchState.date);
  const range = getViewRange(currentDate, view);
  const filters = calendarFilterConverter.toFormValues(searchState);

  const interventionsQuery = useInterventionsQuery({
    from: range.from.toISOString(),
    to: range.to.toISOString(),
  });
  const techniciansQuery = useTechniciansQuery();
  const unscheduledQuery = useUnscheduledInterventionsQuery();
  const updateIntervention = useUpdateIntervention();
  const schedule = useOptimisticScheduleRows(
    interventionsQuery.data,
    unscheduledQuery.data,
    techniciansQuery.data,
  );

  const rows = filterInterventionRows(schedule.scheduled, filters);

  const technicians = filterTechnicians(techniciansQuery.data ?? [], filters.technicianIds);

  const openEdit = (intervention: InterventionRow) =>
    interventionDialog.open({ mode: INTERVENTION_DIALOG_MODES.EDIT, intervention });

  const retryCalendar = () =>
    Promise.all([interventionsQuery.refetch(), techniciansQuery.refetch()]);

  const findScheduleRow = (interventionId: string) =>
    [...schedule.scheduled, ...schedule.unscheduled].find((row) => row.id === interventionId);

  const updateSchedule = (
    interventionId: string,
    payload: UpdateInterventionPayload,
    successMessageKey: TranslationKey<typeof I18N_NAMESPACES.CALENDAR>,
  ) => {
    updateIntervention.mutate(
      { id: interventionId, payload },
      { onSuccess: () => toast.success(t(successMessageKey)) },
    );
  };

  const handleReschedule = (
    interventionId: string,
    technicianId: Nullable<string>,
    startsAt: Date,
  ) => {
    if (isUnchangedSchedule(findScheduleRow(interventionId), technicianId, startsAt)) return;
    updateSchedule(
      interventionId,
      { technicianId, startsAt: startsAt.toISOString() },
      'dragDrop.rescheduleSuccess',
    );
  };

  const handleRescheduleTime = (interventionId: string, startsAt: Date) =>
    handleReschedule(
      interventionId,
      findScheduleRow(interventionId)?.technicianId ?? null,
      startsAt,
    );

  const handleUnschedule = (interventionId: string) =>
    updateSchedule(
      interventionId,
      { startsAt: null, technicianId: null, status: INTERVENTION_STATUSES.TO_SCHEDULE },
      'dragDrop.unscheduleSuccess',
    );

  return (
    <>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>{t('title')}</PageHeaderTitle>
          <PageHeaderDescription>{t('description')}</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <Flex direction={FLEX_DIRECTIONS.COL} gap={4} className="lg:min-h-0 lg:flex-1">
        <CalendarToolbar
          view={view}
          onViewChange={(nextView) => setSearchState({ view: nextView })}
          currentDate={currentDate}
          onNavigate={(direction) =>
            setSearchState({ date: toDateParam(shiftDate(currentDate, view, direction)) })
          }
          onToday={() => setSearchState({ date: undefined })}
          onNewClick={() => interventionDialog.open({ mode: INTERVENTION_DIALOG_MODES.CREATE })}
          isCombinedView={isCombinedView}
          onToggleCombinedView={() => setIsCombinedView((prev) => !prev)}
          unscheduledCount={schedule.unscheduled.length}
          isUnscheduledOpen={isUnscheduledOpen}
          onToggleUnscheduled={() => setIsUnscheduledOpen((prev) => !prev)}
        />
        <CalendarFilters key={restoreKey} />
        <Grid className="lg:min-h-0 lg:flex-1 lg:grid-rows-[minmax(0,1fr)]">
          <QueryState
            isLoading={interventionsQuery.isLoading || techniciansQuery.isLoading}
            isError={interventionsQuery.isError || techniciansQuery.isError}
            onRetry={retryCalendar}
          >
            <CalendarViewSection
              view={view}
              rows={rows}
              technicians={technicians}
              currentDate={currentDate}
              combined={isCombinedView}
              onSelect={openEdit}
              onReschedule={handleReschedule}
              onRescheduleTime={handleRescheduleTime}
            />
          </QueryState>
        </Grid>
      </Flex>
      <UnscheduledPanel
        rows={schedule.unscheduled}
        open={isUnscheduledOpen}
        onOpenChange={setIsUnscheduledOpen}
        onSelect={openEdit}
        onDropUnschedule={handleUnschedule}
      />
      <InterventionDialogs
        target={interventionDialog.target}
        open={interventionDialog.isOpen}
        onOpenChange={interventionDialog.onOpenChange}
      />
    </>
  );
};
