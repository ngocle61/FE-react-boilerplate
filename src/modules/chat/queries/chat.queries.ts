import { queryOptions } from '@tanstack/react-query';

import { CHAT_QUERY_KEYS, GENERAL_CONVERSATION_KEY } from '../constants/query-keys.constant';
import { chatService } from '../services/chat.service';

export const chatQueries = {
  conversation: (interventionId?: string) =>
    queryOptions({
      queryKey: [CHAT_QUERY_KEYS.CONVERSATION, interventionId ?? GENERAL_CONVERSATION_KEY],
      queryFn: ({ signal }) => chatService.getConversation(interventionId, signal),
    }),
};
