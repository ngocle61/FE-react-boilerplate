import { cn, Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS, Table } from '@ui';

import { PaginatedTablePages } from './paginated-table-pages';
import type { PaginatedTableProps } from './paginated-table.type';

export const PaginatedTable = ({
  children,
  summary,
  page,
  totalPages,
  onPageChange,
  className,
}: PaginatedTableProps) => (
  <Flex direction={FLEX_DIRECTIONS.COL} gap={3} className={cn('min-h-0 flex-1', className)}>
    <Table containerClassName="min-h-48 flex-1">{children}</Table>
    <Flex
      align={FLEX_ALIGNMENTS.CENTER}
      justify={FLEX_JUSTIFICATIONS.BETWEEN}
      gap={2}
      wrap
      className="min-h-9 shrink-0 text-sm text-muted-foreground"
    >
      <span>{summary}</span>
      <PaginatedTablePages
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mx-0 w-auto"
      />
    </Flex>
  </Flex>
);
