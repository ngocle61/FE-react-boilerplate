import { fireEvent, render, screen } from '@testing-library/react';
import { CalendarDaysIcon, LayoutDashboardIcon } from 'lucide-react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, describe, expect, it } from 'vitest';

import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { i18nReady } from '@/core/libs/i18n';
import { AppSidebarNav } from '@/shared/components/app-sidebar/app-sidebar-nav';
import type { NavigationGroup } from '@/shared/types/navigation.type';
import { SidebarProvider, TooltipProvider } from '@ui';

const GROUPS: NavigationGroup[] = [
  {
    key: 'workspace',
    labelKey: 'navigation.groups.workspace',
    items: [
      {
        key: 'dashboard',
        labelKey: 'navigation.items.dashboard',
        href: '/dashboard',
        icon: LayoutDashboardIcon,
        access: { permissions: [PERMISSIONS.DASHBOARD_VIEW] },
      },
      {
        key: 'planning',
        labelKey: 'navigation.items.calendar',
        icon: CalendarDaysIcon,
        children: [
          {
            key: 'schedule',
            labelKey: 'navigation.items.chat',
            href: '/planning',
            access: { permissions: [PERMISSIONS.CALENDAR_VIEW] },
          },
          {
            key: 'team',
            labelKey: 'navigation.items.users',
            href: '/planning/team',
            access: { permissions: [PERMISSIONS.USER_MANAGE] },
          },
        ],
      },
    ],
  },
];

const renderNav = (pathname: string) => {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebarNav groups={GROUPS} />
            </SidebarProvider>
          </TooltipProvider>
        ),
      },
    ],
    { initialEntries: [pathname] },
  );
  render(<RouterProvider router={router} />);
};

beforeAll(() => i18nReady);

describe('AppSidebarNav', () => {
  it('links a parent entry to its first child', () => {
    renderNav('/dashboard');

    expect(screen.getByRole('link', { name: 'Calendar' })).toHaveAttribute('href', '/planning');
  });

  it('keeps a parent closed until a child is open, and opens it on demand', () => {
    renderNav('/dashboard');

    expect(screen.queryByRole('link', { name: 'Users' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show or hide Calendar' }));

    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('href', '/planning/team');
  });

  it('opens the parent and marks only the deepest matching child as the current page', () => {
    renderNav('/planning/team/7');

    expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'AI Chat' })).not.toHaveAttribute('aria-current');
  });
});
