import { ROUTE_ACCESS } from '@/core/constants/route-access.constant';
import { queryClient } from '@/core/libs/query-client';
import { readChatRouteContext } from '@/core/utils/chat-route.util';
import { chatQueries } from '@/modules/chat/queries/chat.queries';

import { createPrefetchLoader } from './create-prefetch-loader';

export const chatLoader = createPrefetchLoader(ROUTE_ACCESS.CHAT, (searchParams) => {
  void queryClient.prefetchQuery(
    chatQueries.conversation(readChatRouteContext(searchParams).interventionId),
  );
});
