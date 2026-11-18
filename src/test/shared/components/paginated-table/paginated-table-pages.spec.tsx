import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { PaginatedTablePages } from '@/shared/components/paginated-table/paginated-table-pages';

describe('PaginatedTablePages', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  it('renders nothing when everything fits on one page', () => {
    const { container } = render(
      <PaginatedTablePages page={1} totalPages={1} onPageChange={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('disables previous on the first page and marks the current page', () => {
    render(<PaginatedTablePages page={1} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('reports the page the user picks', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<PaginatedTablePages page={1} totalPages={3} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: 'Page 3' }));
    await user.click(screen.getByRole('button', { name: 'Go to next page' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 2);
  });
});
