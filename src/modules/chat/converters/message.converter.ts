import type { ConversationDto, MessageDto } from '@/core/types/chat.dto';

import type { MessageRow } from '../types/message-row.type';

export const messageConverter = {
  toRow: (dto: MessageDto): MessageRow => ({
    id: dto.id,
    body: dto.body,
    isAssistant: dto.isAssistant,
    createdAt: new Date(dto.createdAt),
  }),

  toRows: (dtos: MessageDto[]): MessageRow[] => dtos.map(messageConverter.toRow),

  toConversationRows: (dto: ConversationDto): MessageRow[] => messageConverter.toRows(dto.messages),
};
