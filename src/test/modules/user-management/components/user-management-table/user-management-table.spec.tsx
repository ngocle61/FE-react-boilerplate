import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { ROLES } from '@/core/constants/roles.constant';
import { i18nReady } from '@/core/libs/i18n';
import { queryClient } from '@/core/libs/query-client';
import { UserManagementTable } from '@/modules/user-management/components/user-management-table/user-management-table';
import type { UserManagementTableProps } from '@/modules/user-management/types/user-management-table.type';
import type { UserRow } from '@/modules/user-management/types/user-row.type';
import type { PaginatedQueryResult } from '@/shared/types/pagination.type';
import { resetSession, signInAs } from '@/test/fixtures/auth-session.fixture';

const CREATED_AT = '2026-01-15T00:00:00.000Z';

const createUserRow = (id: string, fullName: string): UserRow => {
  const raw = {
    id,
    email: `${id}@example.com`,
    fullName,
    avatarUrl: null,
    role: ROLES.MEMBER,
    isActive: true,
    createdAt: CREATED_AT,
  };

  return { ...raw, createdAt: new Date(CREATED_AT), raw };
};

const USER_ROW = createUserRow('user-ann', 'Ann Lee');

const createUsers = (
  overrides: Partial<PaginatedQueryResult<UserRow>> = {},
): PaginatedQueryResult<UserRow> => ({
  rows: [],
  total: 0,
  totalPages: 1,
  isLoading: false,
  isError: false,
  refetch: vi.fn(() => Promise.resolve()),
  ...overrides,
});

const renderTable = (props: Partial<UserManagementTableProps> = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <UserManagementTable
        users={createUsers()}
        page={1}
        onPageChange={vi.fn()}
        onEditRequest={vi.fn()}
        {...props}
      />
    </QueryClientProvider>,
  );

describe('UserManagementTable', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  afterEach(() => {
    resetSession();
  });

  it('shows a spinner row while loading', () => {
    renderTable({ users: createUsers({ isLoading: true }) });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('No users found.')).not.toBeInTheDocument();
  });

  it('shows the empty row when there are no users', () => {
    renderTable();

    expect(screen.getByText('No users found.')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders one row per user', () => {
    renderTable({ users: createUsers({ rows: [USER_ROW], total: 1 }) });

    expect(screen.getByText('Ann Lee')).toBeInTheDocument();
    expect(screen.getByText('user-ann@example.com')).toBeInTheDocument();
    expect(screen.queryByText('No users found.')).not.toBeInTheDocument();
  });

  it('replaces the table with a retry view on error', async () => {
    const user = userEvent.setup();
    const users = createUsers({ isError: true });
    renderTable({ users });

    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(users.refetch).toHaveBeenCalledTimes(1);
  });

  it('locks the row actions of the signed-in user', async () => {
    const user = userEvent.setup();
    signInAs(ROLES.MEMBER);
    renderTable({
      users: createUsers({ rows: [createUserRow('user-member', 'Test MEMBER')], total: 1 }),
    });

    await user.click(screen.getByRole('button', { name: 'Actions' }));

    for (const item of screen.getAllByRole('menuitem')) {
      expect(item).toHaveAttribute('aria-disabled', 'true');
    }
  });
});
