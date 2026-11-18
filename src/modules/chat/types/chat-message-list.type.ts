import type { MessageRow } from './message-row.type';

export interface ChatMessageListProps {
  messages: MessageRow[];
  isPending: boolean;
  streamingBody: string;
}
