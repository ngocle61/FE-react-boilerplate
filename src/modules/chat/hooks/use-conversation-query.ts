import { useQuery } from '@tanstack/react-query';

import { messageConverter } from '../converters/message.converter';
import { chatQueries } from '../queries/chat.queries';

export const useConversationQuery = (interventionId?: string) =>
  useQuery({
    ...chatQueries.conversation(interventionId),
    select: messageConverter.toConversationRows,
  });
