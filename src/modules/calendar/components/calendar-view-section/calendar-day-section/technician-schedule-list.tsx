import { UserAvatar } from '@/shared/components/user-avatar/user-avatar';
import { Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS } from '@ui';

import { INTERVENTION_CARD_VARIANTS } from '../../../constants/intervention-card.constant';
import type { TechnicianScheduleListProps } from '../../../types/technician-schedule-list.type';
import { layoutOverlaps } from '../../../utils/overlap-layout.util';
import { CARD_HEIGHT_PX, getCardTop } from '../../../utils/time-grid.util';
import { InterventionCard } from '../../intervention-card';
import { ScheduleColumnBody } from '../../schedule-column-body';

export const TechnicianScheduleList = ({
  technician,
  rows,
  day,
  onSelect,
  onDropIntervention,
}: TechnicianScheduleListProps) => {
  const layout = layoutOverlaps(rows);

  return (
    <Flex
      direction={FLEX_DIRECTIONS.COL}
      className="w-56 shrink-0 border-r border-border last:border-r-0"
    >
      <Flex
        align={FLEX_ALIGNMENTS.CENTER}
        gap={2}
        className="sticky top-0 z-10 h-11 border-b border-border bg-muted px-2"
      >
        <UserAvatar
          fullName={technician.fullName}
          avatarUrl={technician.avatarUrl}
          className="size-6"
        />
        <span className="truncate text-sm font-medium text-foreground">{technician.fullName}</span>
        <span className="ml-auto text-xs text-muted-foreground">{rows.length}</span>
      </Flex>
      <ScheduleColumnBody
        day={day}
        onDropIntervention={(interventionId, startsAt) =>
          onDropIntervention(interventionId, technician.id, startsAt)
        }
      >
        {layout.map(({ row, column, columnCount, displayStart }) =>
          row.startsAt ? (
            <div
              key={row.id}
              className="absolute"
              style={{
                top: getCardTop(displayStart),
                height: CARD_HEIGHT_PX,
                left: `calc(${(column / columnCount) * 100}% + 4px)`,
                width: `calc(${100 / columnCount}% - 8px)`,
              }}
            >
              <InterventionCard
                row={row}
                onSelect={onSelect}
                variant={INTERVENTION_CARD_VARIANTS.GRID}
                displayStart={displayStart}
              />
            </div>
          ) : null,
        )}
      </ScheduleColumnBody>
    </Flex>
  );
};
