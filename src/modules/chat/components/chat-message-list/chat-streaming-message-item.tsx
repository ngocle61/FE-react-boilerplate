import { Flex, FLEX_JUSTIFICATIONS } from '@ui';

import type { ChatStreamingMessageItemProps } from '../../types/chat-streaming-message-item.type';

export const ChatStreamingMessageItem = ({ body }: ChatStreamingMessageItemProps) => (
  <Flex justify={FLEX_JUSTIFICATIONS.START}>
    <div className="max-w-[75%] rounded-card bg-muted px-3 py-2 text-sm whitespace-pre-wrap text-foreground">
      <p>
        {body}
        <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-foreground align-middle" />
      </p>
    </div>
  </Flex>
);
