import type { ReactNode } from 'react';

export interface PaginatedTableProps {
  children: ReactNode;
  summary: ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
