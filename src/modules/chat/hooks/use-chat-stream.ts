import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { MessageDto } from '@/core/types/chat.dto';
import { getFieldOrErrorMessage } from '@/core/utils/http-error.util';

import { useRevealedText } from './use-revealed-text';
import { chatQueries } from '../queries/chat.queries';
import { chatService } from '../services/chat.service';

export const useChatStream = (interventionId?: string) => {
  const queryClient = useQueryClient();
  const { revealed, append, drain, reset } = useRevealedText();

  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<Nullable<AbortController>>(null);

  const queryKey = chatQueries.conversation(interventionId).queryKey;

  const appendMessage = (message: MessageDto) => {
    queryClient.setQueryData(queryKey, (current) =>
      current ? { ...current, messages: [...current.messages, message] } : current,
    );
  };

  const send = async (content: string) => {
    const controller = new AbortController();
    const reply: { message: Nullable<MessageDto> } = { message: null };

    abortRef.current = controller;
    reset();
    setIsStreaming(true);

    try {
      await chatService.streamMessage(
        { content, interventionId },
        {
          onStart: ({ userMessage }) => appendMessage(userMessage),
          onDelta: ({ text }) => append(text),
          onDone: ({ assistantMessage }) => {
            reply.message = assistantMessage;
          },
        },
        controller.signal,
      );

      await drain();
      if (reply.message) appendMessage(reply.message);
    } catch (error) {
      if (!controller.signal.aborted) toast.error(getFieldOrErrorMessage(error));
      await queryClient.invalidateQueries({ queryKey });
    }

    reset();
    setIsStreaming(false);
    abortRef.current = null;
  };

  const stop = () => abortRef.current?.abort();

  const stopOnLeave = useEffectEvent(stop);

  useEffect(() => () => stopOnLeave(), [interventionId]);

  return { send, stop, streamingBody: revealed, isStreaming };
};
