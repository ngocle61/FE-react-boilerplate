import type { FieldErrorListProps } from './types';

export const FieldErrorList = ({ messages }: FieldErrorListProps) => {
  if (messages.length === 1) return messages[0];

  return (
    <ul className="ml-4 flex list-disc flex-col gap-1">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};
