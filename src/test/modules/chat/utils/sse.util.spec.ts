import { describe, expect, it } from 'vitest';

import type { SseFrame } from '@/modules/chat/types/sse.type';
import { createSseTransformStream } from '@/modules/chat/utils/sse.util';

const parse = async (chunks: string[]): Promise<SseFrame[]> => {
  const stream = new ReadableStream<string>({
    start: (controller) => {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });

  const frames: SseFrame[] = [];
  const reader = stream.pipeThrough(createSseTransformStream()).getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    frames.push(value);
  }

  return frames;
};

describe('createSseTransformStream', () => {
  it('reads a whole frame out of a single chunk', async () => {
    await expect(parse(['event: delta\ndata: {"text":"Xin"}\n\n'])).resolves.toEqual([
      { event: 'delta', data: '{"text":"Xin"}' },
    ]);
  });

  it('joins a frame that arrives split across chunks', async () => {
    await expect(parse(['event: del', 'ta\ndata: {"tex', 't":"Xin"}\n\n'])).resolves.toEqual([
      { event: 'delta', data: '{"text":"Xin"}' },
    ]);
  });

  it('splits several frames delivered in one chunk', async () => {
    const chunk = 'event: delta\ndata: {"text":"Xin"}\n\nevent: delta\ndata: {"text":" chào"}\n\n';

    await expect(parse([chunk])).resolves.toEqual([
      { event: 'delta', data: '{"text":"Xin"}' },
      { event: 'delta', data: '{"text":" chào"}' },
    ]);
  });

  it('ignores the priming newline and comment lines the server sends', async () => {
    await expect(parse(['\n', ': keep-alive\n\n', 'event: done\ndata: {}\n\n'])).resolves.toEqual([
      { event: 'done', data: '{}' },
    ]);
  });

  it('rejoins a multi-line data payload with newlines', async () => {
    await expect(parse(['event: delta\ndata: line one\ndata: line two\n\n'])).resolves.toEqual([
      { event: 'delta', data: 'line one\nline two' },
    ]);
  });

  it('keeps a value that has no space after the colon', async () => {
    await expect(parse(['event:delta\ndata:{"text":"Xin"}\n\n'])).resolves.toEqual([
      { event: 'delta', data: '{"text":"Xin"}' },
    ]);
  });

  it('emits a trailing frame that never got its blank line', async () => {
    await expect(parse(['event: done\ndata: {}'])).resolves.toEqual([
      { event: 'done', data: '{}' },
    ]);
  });

  it('drops a frame that carries no event name', async () => {
    await expect(parse(['data: {"text":"Xin"}\n\n'])).resolves.toEqual([]);
  });
});
