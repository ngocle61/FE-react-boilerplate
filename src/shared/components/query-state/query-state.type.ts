import type { ReactNode } from 'react';

export interface QueryStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onRetry?: () => void;
  loading?: ReactNode;
  empty?: ReactNode;
  children: ReactNode;
}
