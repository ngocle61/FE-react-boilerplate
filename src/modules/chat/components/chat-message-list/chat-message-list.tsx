import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS, Spinner } from '@ui';

import { ChatMessageItem } from './chat-message-item';
import { ChatStreamingMessageItem } from './chat-streaming-message-item';
import type { ChatMessageListProps } from '../../types/chat-message-list.type';

export const ChatMessageList = ({ messages, isPending, streamingBody }: ChatMessageListProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CHAT);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isPending, streamingBody]);

  return (
    <Flex direction={FLEX_DIRECTIONS.COL} gap={3} className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 && !isPending && (
        <p className="m-auto text-sm text-muted-foreground">{t('emptyMessages')}</p>
      )}
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
      {streamingBody && <ChatStreamingMessageItem body={streamingBody} />}
      {isPending && !streamingBody && (
        <Flex justify={FLEX_JUSTIFICATIONS.START}>
          <Flex
            align={FLEX_ALIGNMENTS.CENTER}
            gap={2}
            className="rounded-card bg-muted px-3 py-2 text-sm text-muted-foreground"
          >
            <Spinner className="size-3.5" />
            {t('typing')}
          </Flex>
        </Flex>
      )}
      <div ref={bottomRef} />
    </Flex>
  );
};
