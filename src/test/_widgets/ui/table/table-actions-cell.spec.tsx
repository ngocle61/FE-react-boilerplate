import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table, TableActionsCell, TableBody, TableRow } from '@ui';

describe('TableActionsCell', () => {
  it('renders a cell pinned to the right edge with the row background', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableActionsCell className="px-2">Menu</TableActionsCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell = screen.getByRole('cell', { name: 'Menu' });

    expect(cell).toHaveClass('sticky', 'right-0', 'bg-[color:var(--table-row-bg)]', 'px-2');
  });
});
