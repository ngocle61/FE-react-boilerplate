import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table, TableActionsHead, TableHeader, TableRow } from '@ui';

describe('TableActionsHead', () => {
  it('renders a column header pinned to the right edge', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableActionsHead>Actions</TableActionsHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByRole('columnheader', { name: 'Actions' });

    expect(head).toHaveAttribute('scope', 'col');
    expect(head).toHaveClass('sticky', 'right-0', 'text-right');
  });
});
