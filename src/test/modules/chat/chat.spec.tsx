import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import type { ConversationDto, MessageDto } from '@/core/types/chat.dto';
import { toChatPath } from '@/core/utils/chat-route.util';
import { ChatPage } from '@/modules/chat/chat';
import type { ChatStreamHandlers } from '@/modules/chat/types/chat-stream.type';

const { getConversation, streamMessage } = vi.hoisted(() => ({
  getConversation: vi.fn<(interventionId?: string) => Promise<ConversationDto>>(),
  streamMessage: vi.fn(),
}));

vi.mock('@/modules/chat/services/chat.service', () => ({
  chatService: { getConversation, streamMessage },
}));

const createMessage = (id: string, body: string, isAssistant: boolean): MessageDto => ({
  id,
  body,
  isAssistant,
  createdAt: '2026-10-20T09:00:00.000Z',
});

const conversationWith = (...messages: MessageDto[]): ConversationDto => ({
  id: 'conversation-1',
  interventionId: null,
  messages,
});

const renderChat = (path: string = ROUTE_PATHS.CHAT) => {
  const router = createMemoryRouter([{ path: ROUTE_PATHS.CHAT, element: <ChatPage /> }], {
    initialEntries: [path],
  });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
};

const neverSettlingStream = () =>
  streamMessage.mockImplementation(
    (_payload: unknown, handlers: ChatStreamHandlers, signal: AbortSignal) => {
      handlers.onStart({
        conversationId: 'conversation-1',
        userMessage: createMessage('message-user', 'Hello', false),
      });
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      });
    },
  );

beforeAll(() => i18nReady);

describe('ChatPage', () => {
  beforeEach(() => {
    getConversation.mockReset().mockResolvedValue(conversationWith());
    streamMessage.mockReset();
  });

  it('invites the user to start when the conversation is empty', async () => {
    renderChat();

    expect(await screen.findByText('No messages yet. Say hello!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('shows the messages of the conversation', async () => {
    getConversation.mockResolvedValue(
      conversationWith(
        createMessage('message-1', 'How do I reset the boiler?', false),
        createMessage('message-2', 'Hold the reset button for five seconds.', true),
      ),
    );
    renderChat();

    expect(await screen.findByText('How do I reset the boiler?')).toBeInTheDocument();
    expect(screen.getByText('Hold the reset button for five seconds.')).toBeInTheDocument();
  });

  it('sends on Enter, keeps Shift+Enter for a new line, and shows the reply', async () => {
    streamMessage.mockImplementation((_payload: unknown, handlers: ChatStreamHandlers) => {
      handlers.onStart({
        conversationId: 'conversation-1',
        userMessage: createMessage('message-user', 'Hello\nthere', false),
      });
      handlers.onDone({
        assistantMessage: createMessage('message-bot', 'Hi! How can I help?', true),
      });
      return Promise.resolve();
    });
    const user = userEvent.setup();
    renderChat();
    await screen.findByText('No messages yet. Say hello!');
    const input = screen.getByRole('textbox', { name: 'Ask something…' });

    await user.type(input, 'Hello{Shift>}{Enter}{/Shift}there');
    expect(streamMessage).not.toHaveBeenCalled();
    await user.keyboard('{Enter}');

    expect(await screen.findByText('Hi! How can I help?')).toBeInTheDocument();
    expect(streamMessage).toHaveBeenCalledWith(
      { content: 'Hello\nthere', interventionId: undefined },
      expect.anything(),
      expect.any(AbortSignal),
    );
    expect(input).toHaveValue('');
  });

  it('shows the assistant thinking and lets the user stop the reply', async () => {
    neverSettlingStream();
    const user = userEvent.setup();
    renderChat();

    await screen.findByText('No messages yet. Say hello!');
    await user.type(screen.getByRole('textbox', { name: 'Ask something…' }), 'Hello');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByText('Thinking…')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Stop' }));

    await waitFor(() => expect(screen.queryByText('Thinking…')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('talks about an intervention until the user goes back to the general chat', async () => {
    const user = userEvent.setup();
    const router = renderChat(
      toChatPath({ interventionId: 'intervention-1', label: 'Repair · Acme' }),
    );

    expect(await screen.findByText('About: Repair · Acme')).toBeInTheDocument();
    expect(getConversation).toHaveBeenCalledWith('intervention-1', expect.any(AbortSignal));

    await user.click(screen.getByRole('button', { name: 'Back to general chat' }));

    await waitFor(() => expect(router.state.location.search).toBe(''));
    expect(screen.queryByText('About: Repair · Acme')).not.toBeInTheDocument();
  });
});
