import type { FieldErrorEntry } from './types';

export const toUniqueErrorMessages = (errors: FieldErrorEntry[]): string[] => [
  ...new Set(
    errors.map((error) => error?.message).filter((message): message is string => Boolean(message)),
  ),
];
