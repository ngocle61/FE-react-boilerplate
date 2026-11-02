import { apiClient } from './api-client';
import { streamClient } from './stream-client';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { zConversationResponse } from '../contract/zod.gen';
import type {
  ConversationDto,
  ConversationRequestParams,
  SendMessagePayload,
} from '../types/chat.dto';

export const chatApi = {
  getConversation: (params: ConversationRequestParams, signal?: AbortSignal) =>
    apiClient.get<ConversationDto>(API_ENDPOINTS.CHAT.CONVERSATION, {
      params,
      signal,
      responseSchema: zConversationResponse,
    }),

  streamMessage: (payload: SendMessagePayload, signal: AbortSignal) =>
    streamClient.post(API_ENDPOINTS.CHAT.STREAM, payload, signal),
};
