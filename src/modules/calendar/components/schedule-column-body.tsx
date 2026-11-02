import { addMinutes } from 'date-fns';
import { useState, type DragEvent } from 'react';

import { DRAG_EFFECTS } from '@/shared/constants/drag-and-drop.constant';
import { cn } from '@ui';

import { DropSlotPreview } from './drop-slot-preview';
import {
  DROP_SLOT_LINE_CLASS,
  INTERVENTION_DRAG_DATA_FORMAT,
} from '../constants/calendar.constant';
import { useDraggedIntervention } from '../hooks/use-intervention-drag';
import type {
  ScheduleColumnBodyProps,
  ScheduleDropHover,
} from '../types/schedule-column-body.type';
import {
  getDayGridHeight,
  getDropSlotLines,
  getDropStartMinutes,
  toStartsAtFromMinutes,
} from '../utils/time-grid.util';

export const ScheduleColumnBody = ({
  day,
  onDropIntervention,
  children,
}: ScheduleColumnBodyProps) => {
  const dragged = useDraggedIntervention();

  const [hover, setHover] = useState<Nullable<ScheduleDropHover>>(null);

  const activeHover = dragged && hover?.dragged === dragged ? hover : null;
  const dropStartsAt = activeHover ? toStartsAtFromMinutes(day, activeHover.startMinutes) : null;

  const getStartMinutes = (event: DragEvent<HTMLDivElement>) =>
    getDropStartMinutes(
      event.clientY - event.currentTarget.getBoundingClientRect().top,
      dragged?.grabOffsetMinutes ?? 0,
    );

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = DRAG_EFFECTS.MOVE;
    if (!dragged) return;
    const startMinutes = getStartMinutes(event);
    setHover((prev) =>
      prev?.dragged === dragged && prev.startMinutes === startMinutes
        ? prev
        : { dragged, startMinutes },
    );
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setHover(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHover(null);
    const interventionId = event.dataTransfer.getData(INTERVENTION_DRAG_DATA_FORMAT);
    if (!interventionId) return;
    onDropIntervention(interventionId, toStartsAtFromMinutes(day, getStartMinutes(event)));
  };

  return (
    <div
      className={cn('relative isolate transition-colors', activeHover && 'bg-primary/5')}
      style={{ height: getDayGridHeight() }}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragged && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {getDropSlotLines().map(({ minutes, top, kind }) => (
            <div
              key={minutes}
              className={cn('absolute inset-x-0 border-t', DROP_SLOT_LINE_CLASS[kind])}
              style={{ top }}
            />
          ))}
        </div>
      )}
      {children}
      {activeHover && dropStartsAt && (
        <DropSlotPreview
          startsAt={dropStartsAt}
          endsAt={addMinutes(dropStartsAt, activeHover.dragged.row.durationMinutes)}
        />
      )}
    </div>
  );
};
