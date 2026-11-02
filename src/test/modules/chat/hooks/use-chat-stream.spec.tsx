import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import type { ConversationDto, MessageDto } from '@/core/types/chat.dto';
import { HttpError } from '@/core/utils/http-error.util';
import { useChatStream } from '@/modules/chat/hooks/use-chat-stream';
import { chatQueries } from '@/modules/chat/queries/chat.queries';
import type { ChatStreamHandlers } from '@/modules/chat/types/chat-stream.type';

const { streamMessage } = vi.hoisted(() => ({ streamMessage: vi.fn() }));

vi.mock('@/modules/chat/services/chat.service', () => ({
  chatService: { streamMessage, getConversation: vi.fn() },
}));

const USER_MESSAGE: MessageDto = {
  id: 'message-1',
  body: 'Hi',
  isAssistant: false,
  createdAt: '2026-10-20T00:00:00.000Z',
};

const ASSISTANT_MESSAGE: MessageDto = {
  id: 'message-2',
  body: 'Hello',
  isAssistant: true,
  createdAt: '2026-10-20T00:00:01.000Z',
};

const EMPTY_CONVERSATION: ConversationDto = {
  id: 'conversation-1',
  interventionId: null,
  messages: [],
};

const renderChatStream = () => {
  const queryClient = new QueryClient();
  queryClient.setQueryData(chatQueries.conversation().queryKey, EMPTY_CONVERSATION);
  const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result, rerender, unmount } = renderHook(
    ({ interventionId }: { interventionId?: string }) => useChatStream(interventionId),
    { wrapper, initialProps: {} },
  );
  const messages = () =>
    queryClient.getQueryData<ConversationDto>(chatQueries.conversation().queryKey)?.messages ?? [];
  return { result, rerender, unmount, messages, invalidateQueries };
};

const captureStreamSignal = () => {
  const signals: AbortSignal[] = [];
  streamMessage.mockImplementation(
    (_payload: unknown, _handlers: ChatStreamHandlers, signal: AbortSignal) => {
      signals.push(signal);
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      });
    },
  );
  return () => signals.at(0);
};

beforeAll(() => i18nReady);

describe('useChatStream', () => {
  beforeEach(() => {
    streamMessage.mockReset();
  });

  it('adds the user message, then the assistant reply once the stream is done', async () => {
    streamMessage.mockImplementation((_payload: unknown, handlers: ChatStreamHandlers) => {
      handlers.onStart({ conversationId: 'conversation-1', userMessage: USER_MESSAGE });
      handlers.onDelta({ text: 'Hello' });
      handlers.onDone({ assistantMessage: ASSISTANT_MESSAGE });
      return Promise.resolve();
    });
    const { result, messages } = renderChatStream();

    await act(() => result.current.send('Hi'));

    expect(messages()).toEqual([USER_MESSAGE, ASSISTANT_MESSAGE]);
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.streamingBody).toBe('');
  });

  it('shows the error and reloads the conversation when the stream fails', async () => {
    const toastError = vi.spyOn(toast, 'error');
    streamMessage.mockRejectedValue(new HttpError({ messageKey: 'aiServiceUnavailable' }));
    const { result, invalidateQueries } = renderChatStream();

    await act(() => result.current.send('Hi'));

    expect(toastError).toHaveBeenCalledTimes(1);
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: chatQueries.conversation().queryKey,
    });
    expect(result.current.isStreaming).toBe(false);
  });

  it('stays quiet when the user stops the reply', async () => {
    const toastError = vi.spyOn(toast, 'error');
    streamMessage.mockImplementation(
      (_payload: unknown, _handlers: ChatStreamHandlers, signal: AbortSignal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }),
    );
    const { result } = renderChatStream();

    let sending: Promise<void> = Promise.resolve();
    act(() => {
      sending = result.current.send('Hi');
    });
    act(() => result.current.stop());
    await act(() => sending);

    expect(toastError).not.toHaveBeenCalled();
    expect(result.current.isStreaming).toBe(false);
  });

  it('aborts the reply when the chat page goes away', () => {
    const streamSignal = captureStreamSignal();
    const { result, unmount } = renderChatStream();

    act(() => {
      void result.current.send('Hi');
    });
    unmount();

    expect(streamSignal()?.aborted).toBe(true);
  });

  it('aborts the reply when the chat switches to another intervention', async () => {
    const toastError = vi.spyOn(toast, 'error');
    const streamSignal = captureStreamSignal();
    const { result, rerender } = renderChatStream();

    let sending: Promise<void> = Promise.resolve();
    act(() => {
      sending = result.current.send('Hi');
    });
    rerender({ interventionId: 'intervention-1' });
    await act(() => sending);

    expect(streamSignal()?.aborted).toBe(true);
    expect(toastError).not.toHaveBeenCalled();
    expect(result.current.isStreaming).toBe(false);
  });
});
