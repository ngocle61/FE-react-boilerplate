import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { PaginatedTable } from '@/shared/components/paginated-table/paginated-table';
import type { PaginatedTableProps } from '@/shared/components/paginated-table/paginated-table.type';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui';

const renderTable = (props: Partial<PaginatedTableProps> = {}) =>
  render(
    <PaginatedTable summary="1 user" page={1} totalPages={1} onPageChange={vi.fn()} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ann Lee</TableCell>
        </TableRow>
      </TableBody>
    </PaginatedTable>,
  );

describe('PaginatedTable', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  it('renders the table with its summary and no pagination for a single page', () => {
    renderTable();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Ann Lee')).toBeInTheDocument();
    expect(screen.getByText('1 user')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('scrolls inside a table container that fills the space above the footer', () => {
    renderTable();

    const container = screen.getByRole('table').parentElement;

    expect(container).toHaveAttribute('data-slot', 'table-container');
    expect(container).toHaveClass('flex-1', 'overflow-auto');
    expect(screen.getAllByRole('rowgroup')[0]).toHaveClass('sticky');
  });

  it('reports the page the user picks', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    renderTable({ totalPages: 3, onPageChange });

    await user.click(screen.getByRole('button', { name: 'Page 2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
