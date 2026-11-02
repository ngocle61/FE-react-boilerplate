import type { ReactNode } from 'react';

import type { DraggedIntervention } from './intervention-drag.type';

export interface ScheduleColumnBodyProps {
  day: Date;
  onDropIntervention: (interventionId: string, startsAt: Date) => void;
  children: ReactNode;
}

export interface ScheduleDropHover {
  dragged: DraggedIntervention;
  startMinutes: number;
}
