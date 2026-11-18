import { InboxIcon } from 'lucide-react';
import { useState, type DragEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { QueryState } from '@/shared/components/query-state/query-state';
import { StatusView } from '@/shared/components/status-view/status-view';
import { DRAG_EFFECTS } from '@/shared/constants/drag-and-drop.constant';
import {
  Badge,
  BADGE_VARIANTS,
  cn,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_DIRECTIONS,
  Sheet,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@ui';

import { InterventionCard } from './intervention-card';
import { INTERVENTION_DRAG_DATA_FORMAT } from '../constants/calendar.constant';
import { useUnscheduledInterventionsQuery } from '../hooks/use-unscheduled-interventions-query';
import type { UnscheduledPanelProps } from '../types/unscheduled-panel.type';

export const UnscheduledPanel = ({
  rows,
  open,
  onOpenChange,
  onSelect,
  onDropUnschedule,
}: UnscheduledPanelProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const [isDragOver, setIsDragOver] = useState(false);

  const query = useUnscheduledInterventionsQuery();

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = DRAG_EFFECTS.MOVE;
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const interventionId = event.dataTransfer.getData(INTERVENTION_DRAG_DATA_FORMAT);
    if (interventionId) onDropUnschedule(interventionId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        className={cn('gap-0 transition-colors', isDragOver && 'bg-accent')}
        onInteractOutside={(event) => event.preventDefault()}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <SheetHeader className="pr-12">
          <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
            <SheetTitle className="text-base">{t('unscheduled.title')}</SheetTitle>
            <Badge variant={BADGE_VARIANTS.SECONDARY}>{rows.length}</Badge>
          </Flex>
          <SheetDescription>{t('unscheduled.description')}</SheetDescription>
          <SheetCloseButton label={t('unscheduled.close')} />
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <QueryState
            isLoading={query.isLoading}
            isError={query.isError}
            isEmpty={rows.length === 0}
            onRetry={() => query.refetch()}
            empty={
              <StatusView
                icon={InboxIcon}
                title={t('unscheduled.emptyTitle')}
                description={t('unscheduled.emptyDescription')}
              />
            }
          >
            <Flex direction={FLEX_DIRECTIONS.COL} gap={2}>
              {rows.map((row) => (
                <InterventionCard key={row.id} row={row} onSelect={onSelect} />
              ))}
            </Flex>
          </QueryState>
        </div>
      </SheetContent>
    </Sheet>
  );
};
