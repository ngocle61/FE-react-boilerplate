import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import { RouteErrorPage } from '@/shared/components/route-error-page/route-error-page';

const renderFailingRoute = (error: unknown) => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  const router = createMemoryRouter(
    [
      {
        path: ROUTE_PATHS.ROOT,
        errorElement: <RouteErrorPage />,
        loader: () => {
          throw error;
        },
        element: null,
      },
    ],
    { initialEntries: [ROUTE_PATHS.ROOT] },
  );
  render(<RouterProvider router={router} />);
};

beforeAll(() => i18nReady);

describe('RouteErrorPage', () => {
  it('asks for a reload when a page chunk is missing after a deploy', async () => {
    renderFailingRoute(new TypeError('Failed to fetch dynamically imported module: /a.js'));

    expect(await screen.findByText('A new version is available')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  });

  it('shows a generic error for anything else', async () => {
    renderFailingRoute(new Error('boom'));

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows the not found page for a missing route', async () => {
    renderFailingRoute(new Response(null, { status: 404 }));

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
  });
});
