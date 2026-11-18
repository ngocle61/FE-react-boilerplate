import type { MutationStatus } from '@tanstack/react-query';

export const QUERY_STALE_TIME_MS = 5 * 60 * 1000;

export const QUERY_RETRY_LIMIT = 1;

export const MUTATION_STATUSES = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const satisfies Record<string, MutationStatus>;
