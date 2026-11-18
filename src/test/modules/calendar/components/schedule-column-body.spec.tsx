import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { ScheduleColumnBody } from '@/modules/calendar/components/schedule-column-body';
import {
  DAY_VIEW_PX_PER_MINUTE,
  DAY_VIEW_START_HOUR,
} from '@/modules/calendar/constants/calendar.constant';
import { useInterventionDragStore } from '@/modules/calendar/hooks/use-intervention-drag';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';
import { DRAG_EFFECTS } from '@/shared/constants/drag-and-drop.constant';
import { DRAG_EVENT_TYPES } from '@/shared/constants/drag-and-drop.constant';
import { MINUTES_PER_HOUR } from '@/shared/constants/time.constant';
import type { DragEventType } from '@/shared/types/drag-and-drop.type';

const row = { id: 'a', durationMinutes: 60 } as InterventionRow;

const offsetAt = (hour: number, minute = 0) =>
  ((hour - DAY_VIEW_START_HOUR) * MINUTES_PER_HOUR + minute) * DAY_VIEW_PX_PER_MINUTE;

const dispatchDrag = (
  element: Element,
  type: DragEventType,
  { clientY = 0, relatedTarget = null }: { clientY?: number; relatedTarget?: Nullable<Node> } = {},
) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    clientY: { value: clientY },
    relatedTarget: { value: relatedTarget },
    dataTransfer: { value: { dropEffect: DRAG_EFFECTS.NONE, getData: () => row.id } },
  });
  fireEvent(element, event);
};

const renderBody = (grabOffsetMinutes = 0) => {
  useInterventionDragStore.setState({ dragged: { row, grabOffsetMinutes } });
  const onDropIntervention = vi.fn();
  const { container } = render(
    <ScheduleColumnBody day={new Date(2026, 8, 15)} onDropIntervention={onDropIntervention}>
      <button type="button">Card</button>
    </ScheduleColumnBody>,
  );
  return { body: container.firstElementChild as Element, onDropIntervention };
};

describe('ScheduleColumnBody', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  afterEach(() => {
    useInterventionDragStore.setState({ dragged: null });
  });

  it('previews the exact slot the card will land on', () => {
    const { body } = renderBody();

    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_OVER, { clientY: offsetAt(10, 30) });

    expect(screen.getByText('10:30 – 11:30')).toBeInTheDocument();
  });

  it('drops the card at the previewed time, keeping the point where it was grabbed', () => {
    const { body, onDropIntervention } = renderBody(30);

    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_OVER, { clientY: offsetAt(11) });
    expect(screen.getByText('10:30 – 11:30')).toBeInTheDocument();

    dispatchDrag(body, DRAG_EVENT_TYPES.DROP, { clientY: offsetAt(11) });
    expect(onDropIntervention).toHaveBeenCalledWith('a', new Date(2026, 8, 15, 10, 30));
    expect(screen.queryByText('10:30 – 11:30')).not.toBeInTheDocument();
  });

  it('keeps the preview while the pointer passes over a card in the column', () => {
    const { body } = renderBody();

    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_OVER, { clientY: offsetAt(9) });
    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_LEAVE, {
      relatedTarget: screen.getByRole('button', { name: 'Card' }),
    });

    expect(screen.getByText('09:00 – 10:00')).toBeInTheDocument();
  });

  it('removes the preview when the pointer leaves the column', () => {
    const { body } = renderBody();

    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_OVER, { clientY: offsetAt(9) });
    dispatchDrag(body, DRAG_EVENT_TYPES.DRAG_LEAVE, { relatedTarget: document.body });

    expect(screen.queryByText('09:00 – 10:00')).not.toBeInTheDocument();
  });

  it('shows no preview for a drag that is not an intervention', () => {
    useInterventionDragStore.setState({ dragged: null });
    const { container } = render(
      <ScheduleColumnBody day={new Date(2026, 8, 15)} onDropIntervention={vi.fn()}>
        <span />
      </ScheduleColumnBody>,
    );

    dispatchDrag(container.firstElementChild as Element, DRAG_EVENT_TYPES.DRAG_OVER, {
      clientY: offsetAt(9),
    });

    expect(screen.queryByText('09:00 – 10:00')).not.toBeInTheDocument();
  });
});
