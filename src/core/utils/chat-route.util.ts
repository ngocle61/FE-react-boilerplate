import { CHAT_SEARCH_PARAMS, ROUTE_PATHS } from '../constants/route-paths.constant';
import type { ChatRouteContext } from '../types/chat-route.type';

export const toChatPath = ({ interventionId, label }: ChatRouteContext): string => {
  const params = new URLSearchParams({
    [CHAT_SEARCH_PARAMS.INTERVENTION_ID]: interventionId,
    [CHAT_SEARCH_PARAMS.LABEL]: label,
  });
  return `${ROUTE_PATHS.CHAT}?${params.toString()}`;
};

export const readChatRouteContext = (searchParams: URLSearchParams): Partial<ChatRouteContext> => ({
  interventionId: searchParams.get(CHAT_SEARCH_PARAMS.INTERVENTION_ID) ?? undefined,
  label: searchParams.get(CHAT_SEARCH_PARAMS.LABEL) ?? undefined,
});
