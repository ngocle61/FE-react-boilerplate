import { create } from 'zustand';

import type { InterventionDragStore } from '../types/intervention-drag.type';

export const useInterventionDragStore = create<InterventionDragStore>()((set) => {
  let pendingStart: Maybe<ReturnType<typeof setTimeout>>;

  const endDrag = () => {
    clearTimeout(pendingStart);
    document.removeEventListener('dragend', endDrag);
    document.removeEventListener('drop', endDrag);
    set({ dragged: null });
  };

  return {
    dragged: null,
    actions: {
      startDrag: (dragged) => {
        endDrag();
        document.addEventListener('dragend', endDrag);
        document.addEventListener('drop', endDrag);
        pendingStart = setTimeout(() => set({ dragged }), 0);
      },
    },
  };
});

export const useDraggedIntervention = () => useInterventionDragStore((state) => state.dragged);

export const useIsInterventionDragSource = (interventionId: string) =>
  useInterventionDragStore((state) => state.dragged?.row.id === interventionId);

export const useInterventionDragActions = () => useInterventionDragStore((state) => state.actions);
