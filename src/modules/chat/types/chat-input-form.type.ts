export interface ChatInputFormProps {
  onSend: (content: string) => void;
  onStop: () => void;
  isPending: boolean;
  isStreaming: boolean;
}
