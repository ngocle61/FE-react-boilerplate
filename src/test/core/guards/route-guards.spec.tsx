import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';

import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { SESSION_END_REASONS } from '@/core/constants/session.constant';
import { GuestRoute } from '@/core/guards/guest-route';
import { PermissionRoute } from '@/core/guards/permission-route';
import { ProtectedRoute } from '@/core/guards/protected-route';
import { queryClient } from '@/core/libs/query-client';
import { useAuthStore } from '@/core/store/auth.store';
import { resetSession, signInAs } from '@/test/fixtures/auth-session.fixture';

const renderAt = (initialEntry: string) => {
  const router = createMemoryRouter(
    [
      {
        element: <GuestRoute />,
        children: [{ path: ROUTE_PATHS.SIGN_IN, element: <p>sign-in page</p> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTE_PATHS.ROOT, element: <p>home page</p> },
          {
            element: (
              <PermissionRoute
                permissions={[PERMISSIONS.CHAT_USE]}
                fallback={<p>forbidden page</p>}
              />
            ),
            children: [{ path: ROUTE_PATHS.CHAT, element: <p>chat page</p> }],
          },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
};

describe('route guards', () => {
  beforeEach(() => {
    resetSession();
  });

  it('sends anonymous users to sign-in and remembers the requested path', async () => {
    const router = renderAt(ROUTE_PATHS.CHAT);

    expect(await screen.findByText('sign-in page')).toBeInTheDocument();
    expect(router.state.location.search).toBe('?redirect=%2Fchat');
  });

  it('does not remember the path after an explicit sign-out', async () => {
    useAuthStore.setState({ endReason: SESSION_END_REASONS.SIGN_OUT });
    const router = renderAt(ROUTE_PATHS.CHAT);

    expect(await screen.findByText('sign-in page')).toBeInTheDocument();
    expect(router.state.location.search).toBe('');
  });

  it('sends signed-in users from sign-in to the redirect target', async () => {
    signInAs(ROLES.MEMBER);
    renderAt(`${ROUTE_PATHS.SIGN_IN}?redirect=%2Fchat`);

    expect(await screen.findByText('chat page')).toBeInTheDocument();
  });

  it('ignores redirect targets outside the app', async () => {
    signInAs(ROLES.MEMBER);
    renderAt(`${ROUTE_PATHS.SIGN_IN}?redirect=%2F%2Fevil.com`);

    expect(await screen.findByText('home page')).toBeInTheDocument();
  });

  it('renders the fallback when the role lacks the permission', async () => {
    signInAs(ROLES.VIEWER);
    renderAt(ROUTE_PATHS.CHAT);

    expect(await screen.findByText('forbidden page')).toBeInTheDocument();
  });

  it('renders the page when the role has the permission', async () => {
    signInAs(ROLES.MEMBER);
    renderAt(ROUTE_PATHS.CHAT);

    expect(await screen.findByText('chat page')).toBeInTheDocument();
  });
});
