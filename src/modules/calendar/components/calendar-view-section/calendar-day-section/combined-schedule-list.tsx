import { Flex, FLEX_DIRECTIONS } from '@ui';

import { INTERVENTION_CARD_VARIANTS } from '../../../constants/intervention-card.constant';
import type { CombinedScheduleListProps } from '../../../types/combined-schedule-list.type';
import { layoutOverlaps } from '../../../utils/overlap-layout.util';
import { CARD_HEIGHT_PX, getCardTop } from '../../../utils/time-grid.util';
import { InterventionCard } from '../../intervention-card';
import { ScheduleColumnBody } from '../../schedule-column-body';

export const CombinedScheduleList = ({
  rows,
  day,
  onSelect,
  onDropIntervention,
}: CombinedScheduleListProps) => {
  const layout = layoutOverlaps(rows);

  return (
    <Flex direction={FLEX_DIRECTIONS.COL} className="flex-1">
      <ScheduleColumnBody day={day} onDropIntervention={onDropIntervention}>
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
                technicianLabel={row.technicianName ?? undefined}
              />
            </div>
          ) : null,
        )}
      </ScheduleColumnBody>
    </Flex>
  );
};
