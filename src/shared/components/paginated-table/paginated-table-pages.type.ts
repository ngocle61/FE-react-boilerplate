export interface PaginatedTablePagesProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}
