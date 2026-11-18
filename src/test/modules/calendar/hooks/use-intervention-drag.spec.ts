import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInterventionDragStore } from '@/modules/calendar/hooks/use-intervention-drag';
import type { DraggedIntervention } from '@/modules/calendar/types/intervention-drag.type';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';

const dragged: DraggedIntervention = { row: { id: 'a' } as InterventionRow, grabOffsetMinutes: 0 };

const startDrag = () => useInterventionDragStore.getState().actions.startDrag(dragged);

const getDragged = () => useInterventionDragStore.getState().dragged;

describe('useInterventionDragStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.dispatchEvent(new Event('dragend'));
    vi.useRealTimers();
  });

  it('publishes the dragged card only after the browser has started the drag', () => {
    startDrag();
    expect(getDragged()).toBeNull();

    vi.runAllTimers();
    expect(getDragged()).toBe(dragged);
  });

  it.each(['dragend', 'drop'])('clears the dragged card on %s', (eventName) => {
    startDrag();
    vi.runAllTimers();

    document.dispatchEvent(new Event(eventName));
    expect(getDragged()).toBeNull();
  });

  it('never publishes a drag that ended before it was shown', () => {
    startDrag();
    document.dispatchEvent(new Event('dragend'));

    vi.runAllTimers();
    expect(getDragged()).toBeNull();
  });
});
