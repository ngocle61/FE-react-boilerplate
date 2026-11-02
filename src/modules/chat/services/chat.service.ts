import { chatApi } from '@/core/apis/chat.api';
import { zErrorResponse, zStreamDelta, zStreamDone, zStreamStart } from '@/core/contract/zod.gen';
import type { ConversationDto, SendMessagePayload } from '@/core/types/chat.dto';
import { toBodyHttpError, toNetworkHttpError } from '@/core/utils/http-error.util';

import { CHAT_STREAM_EVENTS } from '../constants/chat-stream.constant';
import type { ChatStreamHandlers } from '../types/chat-stream.type';
import type { SseFrame } from '../types/sse.type';
import { createSseTransformStream, parseFrameData } from '../utils/sse.util';

const dispatchFrame = (frame: SseFrame, handlers: ChatStreamHandlers): boolean => {
  switch (frame.event) {
    case CHAT_STREAM_EVENTS.START:
      handlers.onStart(parseFrameData(frame, zStreamStart));
      return false;
    case CHAT_STREAM_EVENTS.DELTA:
      handlers.onDelta(parseFrameData(frame, zStreamDelta));
      return false;
    case CHAT_STREAM_EVENTS.DONE:
      handlers.onDone(parseFrameData(frame, zStreamDone));
      return true;
    case CHAT_STREAM_EVENTS.ERROR:
      throw toBodyHttpError(parseFrameData(frame, zErrorResponse));
    default:
      return false;
  }
};

const dispatchOrCancel = async (
  reader: ReadableStreamDefaultReader<SseFrame>,
  frame: SseFrame,
  handlers: ChatStreamHandlers,
): Promise<boolean> => {
  try {
    return dispatchFrame(frame, handlers);
  } catch (error) {
    await reader.cancel(error);
    throw error;
  }
};

export const chatService = {
  getConversation: async (
    interventionId?: string,
    signal?: AbortSignal,
  ): Promise<ConversationDto> => {
    const { data } = await chatApi.getConversation(
      { interventionId: interventionId || undefined },
      signal,
    );
    return data;
  },

  streamMessage: async (
    payload: SendMessagePayload,
    handlers: ChatStreamHandlers,
    signal: AbortSignal,
  ): Promise<void> => {
    const body = await chatApi.streamMessage(payload, signal);
    const reader = body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(createSseTransformStream())
      .getReader();

    let isCompleted = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (await dispatchOrCancel(reader, value, handlers)) isCompleted = true;
    }

    if (!isCompleted) throw toNetworkHttpError();
  },
};
