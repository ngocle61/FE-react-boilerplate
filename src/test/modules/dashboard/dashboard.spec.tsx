import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { ROLES } from '@/core/constants/roles.constant';
import { i18nReady } from '@/core/libs/i18n';
import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import type { Permission, Role } from '@/core/types/access.type';
import { DashboardPage } from '@/modules/dashboard/dashboard';
import { createUserDto, resetSession, signInAs } from '@/test/fixtures/auth-session.fixture';

const UNKNOWN_PERMISSION = 'reports:export' as Permission;

const renderDashboard = (role: Role, permissions?: Permission[]) => {
  signInAs(role);
  if (permissions) {
    queryClient.setQueryData(
      authQueries.currentUser().queryKey,
      createUserDto(role, { permissions }),
    );
  }
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const accessRow = (label: string) =>
  within(screen.getByText('Route access').closest('[data-slot=card]') as HTMLElement)
    .getByText(label)
    .closest('li') as HTMLElement;

beforeAll(() => i18nReady);

describe('DashboardPage', () => {
  afterEach(() => {
    resetSession();
  });

  it('greets the user and lists the permissions of their role by resource', () => {
    renderDashboard(ROLES.ADMIN);

    expect(screen.getByRole('heading', { name: 'Welcome, Test ADMIN' })).toBeInTheDocument();
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Manage')).toHaveLength(2);
    expect(screen.queryByText('Locked')).not.toBeInTheDocument();
  });

  it('marks the modules the role cannot open as locked', () => {
    renderDashboard(ROLES.VIEWER);

    expect(within(accessRow('Dashboard')).getByText('Granted')).toBeInTheDocument();
    expect(within(accessRow('AI Chat')).getByText('Locked')).toBeInTheDocument();
    expect(within(accessRow('AI Chat')).getByRole('link', { name: 'Open' })).toHaveAttribute(
      'href',
      '/chat',
    );
  });

  it('shows permissions it has no label for as they are named', () => {
    renderDashboard(ROLES.MEMBER, [PERMISSIONS.DASHBOARD_VIEW, UNKNOWN_PERMISSION]);

    expect(screen.getByText('reports')).toBeInTheDocument();
    expect(screen.getByText('export')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });
});
