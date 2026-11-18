import type { InterventionRow } from './intervention-row.type';

export interface DraggedIntervention {
  row: InterventionRow;
  grabOffsetMinutes: number;
}

export interface InterventionDragActions {
  startDrag: (dragged: DraggedIntervention) => void;
}

export interface InterventionDragStore {
  dragged: Nullable<DraggedIntervention>;
  actions: InterventionDragActions;
}
