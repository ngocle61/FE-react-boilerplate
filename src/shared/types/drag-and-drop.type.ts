import type { DRAG_EVENT_TYPES } from '../constants/drag-and-drop.constant';

export type DragEventType = (typeof DRAG_EVENT_TYPES)[keyof typeof DRAG_EVENT_TYPES];
