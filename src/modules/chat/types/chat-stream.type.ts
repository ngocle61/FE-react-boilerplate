import type { StreamDeltaDto, StreamDoneDto, StreamStartDto } from '@/core/types/chat.dto';

export interface ChatStreamHandlers {
  onStart: (payload: StreamStartDto) => void;
  onDelta: (payload: StreamDeltaDto) => void;
  onDone: (payload: StreamDoneDto) => void;
}
