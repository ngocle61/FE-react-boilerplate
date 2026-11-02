export const SSE_FIELDS = {
  EVENT: 'event',
  DATA: 'data',
  SEPARATOR: ':',
} as const;

export const SSE_FRAME_DELIMITER = '\n\n';

export const SSE_LINE_DELIMITER = /\r\n|\r|\n/;
