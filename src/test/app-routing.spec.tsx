import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AxiosError,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { apiClient } from '@/core/apis/api-client';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import { AUTHORIZATION_HEADER, HTTP_STATUS } from '@/core/constants/http.constant';
import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { i18nReady } from '@/core/libs/i18n';
import { queryClient } from '@/core/libs/query-client';
import { useAuthStore } from '@/core/store/auth.store';
import type { SignInPayload, SignInResponseDto } from '@/core/types/auth.dto';
import type { UserDto } from '@/core/types/user.dto';
import { routes } from '@/router/routes';
import { resetSession } from '@/test/fixtures/auth-session.fixture';
import { TooltipProvider } from '@ui';

const PASSWORD = 'Password@123';

const USERS: readonly UserDto[] = [
  {
    id: 'user-admin',
    email: 'admin@example.com',
    fullName: 'Alex Nguyen',
    avatarUrl: null,
    role: ROLES.ADMIN,
    permissions: [...ROLE_PERMISSIONS[ROLES.ADMIN]],
  },
  {
    id: 'user-member',
    email: 'member@example.com',
    fullName: 'Morgan Tran',
    avatarUrl: null,
    role: ROLES.MEMBER,
    permissions: [...ROLE_PERMISSIONS[ROLES.MEMBER]],
  },
  {
    id: 'user-viewer',
    email: 'viewer@example.com',
    fullName: 'Taylor Le',
    avatarUrl: null,
    role: ROLES.VIEWER,
    permissions: [...ROLE_PERMISSIONS[ROLES.VIEWER]],
  },
];

const SLOW = { timeout: 5000 };

const ROUTING_SUITE_TIMEOUT_MS = 20_000;

const preloadRoutedPages = () =>
  Promise.all([
    import('@/modules/authentication/sign-in/sign-in'),
    import('@/modules/chat/chat'),
    import('@/modules/user-management/user-management'),
  ]);

const toResponse = (
  config: InternalAxiosRequestConfig,
  status: number,
  data: unknown,
): AxiosResponse => ({ data, status, statusText: '', headers: {}, config });

const toRejection = (
  config: InternalAxiosRequestConfig,
  status: number,
  code: string,
  messageKey: string,
) =>
  Promise.reject(
    new AxiosError(
      code,
      AxiosError.ERR_BAD_REQUEST,
      config,
      null,
      toResponse(config, status, { code, message: messageKey }),
    ),
  );

const stubBackend: AxiosAdapter = async (config) => {
  if (config.url === API_ENDPOINTS.AUTH.SIGN_IN) {
    const { email, password } = JSON.parse(config.data as string) as SignInPayload;
    const user = USERS.find((candidate) => candidate.email === email);
    if (!user || password !== PASSWORD) {
      return toRejection(
        config,
        HTTP_STATUS.UNAUTHORIZED,
        'invalid_credentials',
        'invalidCredentials',
      );
    }
    return toResponse(config, 200, {
      user,
      accessToken: `access-${user.id}`,
      refreshToken: `refresh-${user.id}`,
    } satisfies SignInResponseDto);
  }

  if (config.url === API_ENDPOINTS.USERS.ME) {
    const authorization = config.headers.get(AUTHORIZATION_HEADER);
    const user = USERS.find((candidate) => authorization === `Bearer access-${candidate.id}`);
    return user
      ? toResponse(config, 200, user)
      : toRejection(config, HTTP_STATUS.FORBIDDEN, 'forbidden', 'forbidden');
  }

  return toRejection(config, HTTP_STATUS.NOT_FOUND, 'not_found', 'notFound');
};

const originalAdapter = apiClient.defaults.adapter;

const renderApp = (initialEntry: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [initialEntry] });

  render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>,
  );

  return router;
};

const getSidebar = () => within(document.querySelector<HTMLElement>('[data-slot="sidebar"]')!);

const signIn = async (email: string, password = PASSWORD) => {
  const user = userEvent.setup();
  await user.type(await screen.findByLabelText('Email', {}, SLOW), email);
  await user.type(screen.getByLabelText('Password'), password);
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
};

describe('app routing', { timeout: ROUTING_SUITE_TIMEOUT_MS }, () => {
  beforeAll(async () => {
    apiClient.defaults.adapter = stubBackend;
    await Promise.all([i18nReady, preloadRoutedPages()]);
  }, ROUTING_SUITE_TIMEOUT_MS);

  beforeEach(() => {
    resetSession();
  });

  afterAll(() => {
    apiClient.defaults.adapter = originalAdapter;
  });

  it('returns an anonymous visitor to the requested page after signing in', async () => {
    const router = renderApp(ROUTE_PATHS.CHAT);

    expect(await screen.findByText('Welcome back', {}, SLOW)).toBeInTheDocument();
    await signIn('member@example.com');

    expect(await screen.findByRole('heading', { name: 'AI Chat' }, SLOW)).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(ROUTE_PATHS.CHAT);
  });

  it('keeps the URL and renders access denied when the role lacks the permission', async () => {
    const router = renderApp(ROUTE_PATHS.CHAT);

    await signIn('viewer@example.com');

    expect(await screen.findByText('Access denied', {}, SLOW)).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(ROUTE_PATHS.CHAT);
    expect(getSidebar().getByRole('link', { name: 'Calendar' })).toBeInTheDocument();
    expect(getSidebar().queryByRole('link', { name: 'AI Chat' })).not.toBeInTheDocument();
  });

  it('lets administrators reach the administration area', async () => {
    renderApp(ROUTE_PATHS.USERS);

    await signIn('admin@example.com');

    expect(await screen.findByRole('heading', { name: 'Users' }, SLOW)).toBeInTheDocument();
    expect(getSidebar().getByRole('link', { name: 'Users' })).toBeInTheDocument();
  });

  it('stays on sign-in when the credentials are wrong', async () => {
    const router = renderApp(ROUTE_PATHS.SIGN_IN);

    await signIn('member@example.com', 'wrong-password');

    expect(await screen.findByRole('button', { name: 'Sign in' }, SLOW)).toBeEnabled();
    expect(router.state.location.pathname).toBe(ROUTE_PATHS.SIGN_IN);
    expect(useAuthStore.getState().accessToken).toBeNull();
  });
});
