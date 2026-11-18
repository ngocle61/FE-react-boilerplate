import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import { CalendarFilters } from '@/modules/calendar/components/calendar-filters';
import { DEFAULT_DEBOUNCE_MS } from '@/shared/constants/debounce.constant';

vi.mock('@/modules/calendar/hooks/use-technician-options-query', () => ({
  useTechnicianOptionsQuery: () => ({ data: [] }),
}));

const renderFilters = (search = '') => {
  const router = createMemoryRouter(
    [{ path: ROUTE_PATHS.CALENDAR, element: <CalendarFilters /> }],
    { initialEntries: [`${ROUTE_PATHS.CALENDAR}${search}`] },
  );
  render(<RouterProvider router={router} />);
  return router;
};

describe('CalendarFilters', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  it('restores the filters from the URL and keeps the view and date untouched', async () => {
    const router = renderFilters('?view=week&date=2026-01-31&search=boiler');

    expect(screen.getByRole('textbox', { name: 'Search interventions' })).toHaveValue('boiler');
    await new Promise((resolve) => setTimeout(resolve, DEFAULT_DEBOUNCE_MS + 100));
    expect(router.state.location.search).toBe('?view=week&date=2026-01-31&search=boiler');
  });

  it('writes a multi-select change without waiting for the search debounce', async () => {
    const user = userEvent.setup();
    const router = renderFilters('?view=week');

    await user.click(screen.getByRole('button', { name: 'Statuses' }));
    await user.click(screen.getByRole('option', { name: 'Scheduled' }));

    await waitFor(
      () =>
        expect(router.state.location.search).toBe(
          `?view=week&statuses=${INTERVENTION_STATUSES.SCHEDULED}`,
        ),
      { timeout: DEFAULT_DEBOUNCE_MS / 2 },
    );
  });

  it('writes the trimmed search once typing stops, then removes it with clear all', async () => {
    const user = userEvent.setup();
    const router = renderFilters();
    const search = screen.getByRole('textbox', { name: 'Search interventions' });

    await user.type(search, ' boiler ');
    expect(router.state.location.search).toBe('');

    await waitFor(() => expect(router.state.location.search).toBe('?search=boiler'));

    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(search).toHaveValue('');
    await waitFor(() => expect(router.state.location.search).toBe(''));
  });

  it('labels the multi-select search and actions in the app language', async () => {
    const user = userEvent.setup();
    renderFilters('?statuses=SCHEDULED');

    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove Scheduled' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Statuses' }));

    expect(await screen.findByPlaceholderText('Search…')).toBeInTheDocument();
  });
});
