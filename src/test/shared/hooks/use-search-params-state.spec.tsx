import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { userManagementSearchSchema } from '@/modules/user-management/schema/user-management-search.schema';
import { useSearchParamsState } from '@/shared/hooks/use-search-params-state';

const SearchParamsHarness = () => {
  const first = useSearchParamsState(userManagementSearchSchema);
  const second = useSearchParamsState(userManagementSearchSchema);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          first.setState({ search: 'ann' });
          first.setState({ page: 2 });
        }}
      >
        Same instance
      </button>
      <button
        type="button"
        onClick={() => {
          first.setState({ search: 'ann' });
          second.setState({ page: 2 });
        }}
      >
        Two instances
      </button>
      <button type="button" onClick={() => first.setState({ search: 'ann' })}>
        Search
      </button>
      <button type="button" onClick={() => first.setState({ page: 2 })}>
        Page
      </button>
    </>
  );
};

const renderHarness = () => {
  const router = createMemoryRouter(
    [{ path: ROUTE_PATHS.USERS, element: <SearchParamsHarness /> }],
    { initialEntries: [ROUTE_PATHS.USERS] },
  );
  render(<RouterProvider router={router} />);
  return router;
};

describe('useSearchParamsState', () => {
  it('keeps both patches when one instance sets state twice in the same tick', async () => {
    const user = userEvent.setup();
    const router = renderHarness();

    await user.click(screen.getByRole('button', { name: 'Same instance' }));

    await waitFor(() => expect(router.state.location.search).toBe('?page=2&search=ann'));
  });

  it('keeps both patches when two instances set state in the same tick', async () => {
    const user = userEvent.setup();
    const router = renderHarness();

    await user.click(screen.getByRole('button', { name: 'Two instances' }));

    await waitFor(() => expect(router.state.location.search).toBe('?page=2&search=ann'));
  });

  it('builds on the current URL once the user goes back', async () => {
    const user = userEvent.setup();
    const router = renderHarness();

    await user.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => expect(router.state.location.search).toBe('?search=ann'));
    await act(() => router.navigate(-1));
    await waitFor(() => expect(router.state.location.search).toBe(''));

    await user.click(screen.getByRole('button', { name: 'Page' }));

    await waitFor(() => expect(router.state.location.search).toBe('?page=2'));
  });
});
