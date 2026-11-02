import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import { UserManagementFilters } from '@/modules/user-management/components/user-management-toolbar/user-management-filters';
import { DEFAULT_DEBOUNCE_MS } from '@/shared/constants/debounce.constant';

const waitPastDebounce = () =>
  new Promise((resolve) => setTimeout(resolve, DEFAULT_DEBOUNCE_MS + 100));

const renderFilters = (search = '') => {
  const router = createMemoryRouter(
    [{ path: ROUTE_PATHS.USERS, element: <UserManagementFilters /> }],
    { initialEntries: [`${ROUTE_PATHS.USERS}${search}`] },
  );
  render(<RouterProvider router={router} />);
  return router;
};

describe('UserManagementFilters', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  it('restores the filters from the URL without rewriting it on mount', async () => {
    const router = renderFilters('?page=3&search=ann&isActive=false');

    expect(screen.getByRole('textbox', { name: 'Search users' })).toHaveValue('ann');
    await waitPastDebounce();
    expect(router.state.location.search).toBe('?page=3&search=ann&isActive=false');
  });

  it('writes the search once typing stops and returns to the first page', async () => {
    const user = userEvent.setup();
    const router = renderFilters('?page=3');

    await user.type(screen.getByRole('textbox', { name: 'Search users' }), 'ann');
    expect(router.state.location.search).toBe('?page=3');

    await waitFor(() => expect(router.state.location.search).toBe('?search=ann'));
  });

  it('leaves the URL alone when typing only whitespace', async () => {
    const user = userEvent.setup();
    const router = renderFilters('?page=2');

    await user.type(screen.getByRole('textbox', { name: 'Search users' }), '   ');
    await waitPastDebounce();

    expect(router.state.location.search).toBe('?page=2');
  });

  it('clears every filter from the URL with the clear all button', async () => {
    const user = userEvent.setup();
    const router = renderFilters('?search=ann&role=ADMIN');
    const search = screen.getByRole('textbox', { name: 'Search users' });

    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(search).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
    await waitFor(() => expect(router.state.location.search).toBe(''));
  });

  it('writes a select change at once and returns to the first page', async () => {
    const user = userEvent.setup();
    const router = renderFilters('?page=3');

    await user.click(screen.getByRole('combobox', { name: 'Role' }));
    await user.click(await screen.findByRole('option', { name: 'Admin' }));

    await waitFor(() => expect(router.state.location.search).toBe('?role=ADMIN'));
    expect(screen.getByRole('combobox', { name: 'Role' })).toHaveTextContent('Admin');
  });

  it('keeps what the user types while the previous search is being written', async () => {
    const user = userEvent.setup();
    const router = renderFilters();
    const search = screen.getByRole('textbox', { name: 'Search users' });

    await user.type(search, 'ann');
    await waitFor(() => expect(router.state.location.search).toBe('?search=ann'));
    await user.type(search, ' lee');

    expect(search).toHaveValue('ann lee');
    await waitFor(() => expect(router.state.location.search).toBe('?search=ann+lee'));
  });
});
