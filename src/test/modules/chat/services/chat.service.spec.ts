import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HttpError } from '@/core/utils/http-error.util';
import { chatService } from '@/modules/chat/services/chat.service';
import type { ChatStreamHandlers } from '@/modules/chat/types/chat-stream.type';

const { post } = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock('@/core/apis/stream-client', () => ({ streamClient: { post } }));

const USER_MESSAGE = {
  id: 'message-1',
  body: 'Hi',
  isAssistant: false,
  createdAt: '2026-01-01T00:00:00.000Z',
};
const ASSISTANT_MESSAGE = {
  id: 'message-2',
  body: 'Xin chào',
  isAssistant: true,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const frame = (event: string, data: unknown) =>
  `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;

const respondWith = (...frames: string[]) => {
  const encoder = new TextEncoder();
  post.mockResolvedValue(
    new ReadableStream<Uint8Array>({
      start: (controller) => {
        for (const chunk of frames) controller.enqueue(encoder.encode(chunk));
        controller.close();
      },
    }),
  );
};

const createHandlers = (): ChatStreamHandlers => ({
  onStart: vi.fn(),
  onDelta: vi.fn(),
  onDone: vi.fn(),
});

const send = (handlers: ChatStreamHandlers) =>
  chatService.streamMessage({ content: 'Hi' }, handlers, new AbortController().signal);

describe('chatService.streamMessage', () => {
  let handlers: ChatStreamHandlers;

  beforeEach(() => {
    handlers = createHandlers();
  });

  it('routes each frame to its handler until the reply is done', async () => {
    respondWith(
      frame('start', { conversationId: 'conversation-1', userMessage: USER_MESSAGE }),
      frame('delta', { text: 'Xin' }),
      frame('delta', { text: ' chào' }),
      frame('done', { assistantMessage: ASSISTANT_MESSAGE }),
    );

    await expect(send(handlers)).resolves.toBeUndefined();

    expect(handlers.onStart).toHaveBeenCalledWith({
      conversationId: 'conversation-1',
      userMessage: USER_MESSAGE,
    });
    expect(handlers.onDelta).toHaveBeenNthCalledWith(1, { text: 'Xin' });
    expect(handlers.onDelta).toHaveBeenNthCalledWith(2, { text: ' chào' });
    expect(handlers.onDone).toHaveBeenCalledWith({ assistantMessage: ASSISTANT_MESSAGE });
  });

  it('raises the error the server reported mid-stream', async () => {
    respondWith(
      frame('start', { conversationId: 'conversation-1', userMessage: USER_MESSAGE }),
      frame('delta', { text: 'Nửa c' }),
      frame('error', { code: 'ai_service_unavailable', message: 'aiServiceUnavailable' }),
    );

    const error: unknown = await send(handlers).catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({
      code: 'ai_service_unavailable',
      messageKey: 'aiServiceUnavailable',
    });
    expect(handlers.onDelta).toHaveBeenCalledTimes(1);
    expect(handlers.onDone).not.toHaveBeenCalled();
  });

  it('treats a stream that closes without a done frame as a broken connection', async () => {
    respondWith(
      frame('start', { conversationId: 'conversation-1', userMessage: USER_MESSAGE }),
      frame('delta', { text: 'Nửa c' }),
    );

    const error: unknown = await send(handlers).catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ messageKey: 'networkError' });
  });

  it('stops with a contract error when a frame does not match the API schema', async () => {
    respondWith(frame('delta', { text: 42 }));

    const error: unknown = await send(handlers).catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ code: 'contract_mismatch', messageKey: 'contractMismatch' });
    expect(handlers.onDelta).not.toHaveBeenCalled();
  });

  it('cancels the response body when it stops on a bad frame', async () => {
    const cancel = vi.fn();
    post.mockResolvedValue(
      new ReadableStream<Uint8Array>({
        start: (controller) => {
          controller.enqueue(
            new TextEncoder().encode(
              frame('error', { code: 'ai', message: 'aiServiceUnavailable' }),
            ),
          );
        },
        cancel,
      }),
    );

    const error: unknown = await send(handlers).catch((reason: unknown) => reason);

    expect(error).toMatchObject({ messageKey: 'aiServiceUnavailable' });
    expect(cancel).toHaveBeenCalledWith(error);
  });

  it('reports a frame that is not JSON as a contract error', async () => {
    respondWith('event: delta\ndata: {not json\n\n');

    const error: unknown = await send(handlers).catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toMatchObject({ code: 'contract_mismatch', messageKey: 'contractMismatch' });
  });

  it('ignores frames it does not know', async () => {
    respondWith(frame('heartbeat', {}), frame('done', { assistantMessage: ASSISTANT_MESSAGE }));

    await expect(send(handlers)).resolves.toBeUndefined();
    expect(handlers.onDone).toHaveBeenCalledTimes(1);
  });
});
