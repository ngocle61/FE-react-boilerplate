import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { formatTime } from '@/core/utils/date.util';
import { cn, Flex, FLEX_JUSTIFICATIONS } from '@ui';

import type { ChatMessageItemProps } from '../../types/chat-message-item.type';

export const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  const { i18n } = useTranslation(I18N_NAMESPACES.CHAT);

  return (
    <Flex justify={message.isAssistant ? FLEX_JUSTIFICATIONS.START : FLEX_JUSTIFICATIONS.END}>
      <div
        className={cn(
          'max-w-[75%] rounded-card px-3 py-2 text-sm whitespace-pre-wrap',
          message.isAssistant ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground',
        )}
      >
        <p>{message.body}</p>
        <span
          className={cn(
            'mt-1 block text-[10px]',
            message.isAssistant ? 'text-muted-foreground' : 'text-primary-foreground/70',
          )}
        >
          {formatTime(message.createdAt, i18n.language)}
        </span>
      </div>
    </Flex>
  );
};
