import type { z } from 'zod';

import type {
  zChatGetConversationQuery,
  zChatStreamMessageBody,
  zConversationResponse,
  zMessageResponse,
  zStreamDelta,
  zStreamDone,
  zStreamStart,
} from '../contract/zod.gen';

export type MessageDto = z.infer<typeof zMessageResponse>;

export type ConversationDto = z.infer<typeof zConversationResponse>;

export type ConversationRequestParams = z.input<typeof zChatGetConversationQuery>;

export type SendMessagePayload = z.input<typeof zChatStreamMessageBody>;

export type StreamStartDto = z.infer<typeof zStreamStart>;

export type StreamDeltaDto = z.infer<typeof zStreamDelta>;

export type StreamDoneDto = z.infer<typeof zStreamDone>;
