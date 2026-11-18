import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { readChatRouteContext } from '@/core/utils/chat-route.util';
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@/shared/components/page-header/page-header';
import { QueryState } from '@/shared/components/query-state/query-state';
import { Flex, FLEX_DIRECTIONS } from '@ui';

import { ChatContextBanner } from './components/chat-context-banner';
import { ChatInputForm } from './components/chat-input-form';
import { ChatMessageList } from './components/chat-message-list/chat-message-list';
import { useChatStream } from './hooks/use-chat-stream';
import { useConversationQuery } from './hooks/use-conversation-query';

export const ChatPage = () => {
  const { t } = useTranslation([I18N_NAMESPACES.CHAT, I18N_NAMESPACES.COMMON]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { interventionId, label: contextLabel } = readChatRouteContext(searchParams);

  const conversationQuery = useConversationQuery(interventionId);
  const chatStream = useChatStream(interventionId);

  return (
    <Flex direction={FLEX_DIRECTIONS.COL} gap={4} className="flex-1 overflow-hidden">
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>{t('title')}</PageHeaderTitle>
          <PageHeaderDescription>{t('description')}</PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <Flex
        direction={FLEX_DIRECTIONS.COL}
        className="flex-1 overflow-hidden rounded-card border border-border bg-card"
      >
        {interventionId && contextLabel && (
          <ChatContextBanner label={contextLabel} onClear={() => setSearchParams({})} />
        )}
        <QueryState
          isLoading={conversationQuery.isLoading}
          isError={conversationQuery.isError}
          onRetry={() => conversationQuery.refetch()}
        >
          <ChatMessageList
            messages={conversationQuery.data ?? []}
            isPending={chatStream.isStreaming}
            streamingBody={chatStream.streamingBody}
          />
        </QueryState>
        <ChatInputForm
          onSend={chatStream.send}
          onStop={chatStream.stop}
          isPending={chatStream.isStreaming || conversationQuery.isLoading}
          isStreaming={chatStream.isStreaming}
        />
      </Flex>
    </Flex>
  );
};
