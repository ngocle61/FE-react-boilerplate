import { REVEAL_CATCH_UP_DIVISOR, REVEAL_MIN_CHARS } from '../constants/reveal.constant';

export const nextRevealCount = (revealed: number, received: number): number => {
  const backlog = received - revealed;
  if (backlog <= 0) return received;

  const step = Math.max(REVEAL_MIN_CHARS, Math.ceil(backlog / REVEAL_CATCH_UP_DIVISOR));
  return revealed + Math.min(step, backlog);
};
