import type { DragEvent, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { useAccess } from '@/core/hooks/use-access';
import { DRAG_EFFECTS } from '@/shared/constants/drag-and-drop.constant';
import { KEYBOARD_KEYS } from '@/shared/constants/keyboard.constant';
import {
  cn,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_DIRECTIONS,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ui';

import { InterventionCallLink } from './intervention-call-link';
import { InterventionCardBody } from './intervention-card-body';
import { InterventionCardTooltipBody } from './intervention-card-tooltip-body';
import { InterventionChatLink } from './intervention-chat-link';
import { InterventionCornerBadge } from './intervention-corner-badge';
import { INTERVENTION_DRAG_DATA_FORMAT } from '../constants/calendar.constant';
import {
  INTERVENTION_CARD_ACTIONS_OFFSET,
  INTERVENTION_CARD_VARIANTS,
} from '../constants/intervention-card.constant';
import { INTERVENTION_CARD_BORDER_COLOR } from '../constants/intervention-status.constant';
import {
  useInterventionDragActions,
  useIsInterventionDragSource,
} from '../hooks/use-intervention-drag';
import type { InterventionCardProps } from '../types/intervention-card.type';
import { toTimeRangeParts } from '../utils/format-date.util';
import { getGrabOffsetMinutes } from '../utils/time-grid.util';

export const InterventionCard = ({
  row,
  onSelect,
  className,
  draggable = true,
  technicianLabel,
  variant = INTERVENTION_CARD_VARIANTS.LIST,
  displayStart,
}: InterventionCardProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);
  const { can } = useAccess();
  const { startDrag } = useInterventionDragActions();
  const isDragSource = useIsInterventionDragSource(row.id);

  const isGrid = variant === INTERVENTION_CARD_VARIANTS.GRID;
  const hasCallLink = Boolean(row.clientPhone);
  const hasChatLink = can({ permissions: [PERMISSIONS.CHAT_USE] });
  const actionCount = Number(hasCallLink) + Number(hasChatLink);
  const timeRangeParts = toTimeRangeParts(row, i18n.language);
  const timeRange = timeRangeParts ? t('card.timeRange', { ...timeRangeParts }) : null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEYS.ENTER || event.key === KEYBOARD_KEYS.SPACE) {
      event.preventDefault();
      onSelect(row);
    }
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(INTERVENTION_DRAG_DATA_FORMAT, row.id);
    event.dataTransfer.effectAllowed = DRAG_EFFECTS.MOVE;
    const pointerOffsetPx = event.clientY - event.currentTarget.getBoundingClientRect().top;
    startDrag({
      row,
      grabOffsetMinutes:
        row.startsAt && displayStart
          ? getGrabOffsetMinutes(pointerOffsetPx, row.startsAt, displayStart)
          : 0,
    });
  };

  return (
    <div className={cn('group/card relative w-full', isGrid && 'h-full', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Flex
            role="button"
            tabIndex={0}
            draggable={draggable}
            onDragStart={handleDragStart}
            onClick={() => onSelect(row)}
            onKeyDown={handleKeyDown}
            direction={FLEX_DIRECTIONS.COL}
            className={cn(
              '@container relative w-full overflow-hidden rounded-md border border-l-4 border-border bg-card text-left text-xs shadow-default transition-colors group-hover/card:bg-accent',
              isGrid ? 'h-full flex-wrap content-start gap-x-4 gap-y-0.5 px-2 py-1' : 'gap-1 p-2',
              draggable && 'cursor-grab active:cursor-grabbing',
              isDragSource && 'opacity-50',
              INTERVENTION_CARD_BORDER_COLOR[row.status],
            )}
          >
            {row.isUrgent && <InterventionCornerBadge />}
            <InterventionCardBody
              row={row}
              variant={variant}
              timeRange={timeRange}
              technicianLabel={technicianLabel}
              actionCount={actionCount}
            />
          </Flex>
        </TooltipTrigger>
        <TooltipContent className="flex-col items-start gap-0.5">
          <InterventionCardTooltipBody
            row={row}
            timeRange={timeRange}
            technicianLabel={technicianLabel}
          />
        </TooltipContent>
      </Tooltip>
      {actionCount > 0 && (
        <Flex
          align={FLEX_ALIGNMENTS.CENTER}
          gap={1.5}
          className={cn('absolute h-5', INTERVENTION_CARD_ACTIONS_OFFSET[variant])}
        >
          {hasCallLink && <InterventionCallLink interventionId={row.id} />}
          {hasChatLink && <InterventionChatLink row={row} />}
        </Flex>
      )}
    </div>
  );
};
