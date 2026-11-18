import type { z } from 'zod';

import { HTTP_STATUS } from '@/core/constants/http.constant';
import { parseContract } from '@/core/utils/contract.util';
import { toContractHttpError } from '@/core/utils/http-error.util';

import { SSE_FIELDS, SSE_FRAME_DELIMITER, SSE_LINE_DELIMITER } from '../constants/sse.constant';
import type { SseFrame } from '../types/sse.type';

const readField = (line: string): [string, string] => {
  const separatorIndex = line.indexOf(SSE_FIELDS.SEPARATOR);
  if (separatorIndex === -1) return [line, ''];

  const value = line.slice(separatorIndex + 1);
  return [line.slice(0, separatorIndex), value.startsWith(' ') ? value.slice(1) : value];
};

const parseFrame = (raw: string): Nullable<SseFrame> => {
  const data: string[] = [];
  let event = '';

  for (const line of raw.split(SSE_LINE_DELIMITER)) {
    if (!line || line.startsWith(SSE_FIELDS.SEPARATOR)) continue;

    const [field, value] = readField(line);
    if (field === SSE_FIELDS.EVENT) event = value;
    if (field === SSE_FIELDS.DATA) data.push(value);
  }

  if (!event || data.length === 0) return null;

  return { event, data: data.join('\n') };
};

const parseFrameJson = (data: string): unknown => {
  try {
    return JSON.parse(data);
  } catch (error) {
    throw toContractHttpError(HTTP_STATUS.OK, error);
  }
};

export const parseFrameData = <TSchema extends z.ZodType>(
  frame: SseFrame,
  schema: TSchema,
): z.output<TSchema> => parseContract(schema, parseFrameJson(frame.data), HTTP_STATUS.OK);

export const createSseTransformStream = (): TransformStream<string, SseFrame> => {
  let buffer = '';

  return new TransformStream<string, SseFrame>({
    transform: (chunk, controller) => {
      buffer += chunk;

      const frames = buffer.split(SSE_FRAME_DELIMITER);
      buffer = frames.pop() ?? '';

      for (const frame of frames) {
        const parsed = parseFrame(frame);
        if (parsed) controller.enqueue(parsed);
      }
    },

    flush: (controller) => {
      const parsed = parseFrame(buffer);
      if (parsed) controller.enqueue(parsed);
    },
  });
};
