export const DRAG_DATA_FORMATS = {
  TEXT: 'text/plain',
} as const;

export const DRAG_EFFECTS = {
  COPY: 'copy',
  LINK: 'link',
  MOVE: 'move',
  NONE: 'none',
} as const;

export const DRAG_EVENT_TYPES = {
  DRAG_OVER: 'dragover',
  DRAG_LEAVE: 'dragleave',
  DROP: 'drop',
} as const;
