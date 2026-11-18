import { Outlet } from 'react-router';

import { useCurrentUserQuery } from '@/core/hooks/use-current-user-query';
import { AppHeader } from '@/shared/components/app-header/app-header';
import { AppSidebar } from '@/shared/components/app-sidebar/app-sidebar';
import { PageLoader } from '@/shared/components/page-loader/page-loader';
import { QueryState } from '@/shared/components/query-state/query-state';
import { RouteProgress } from '@/shared/components/route-progress/route-progress';
import { SignOutDialog } from '@/shared/components/sign-out-dialog/sign-out-dialog';
import { useDisclosure } from '@/shared/hooks/use-disclosure';
import { useSignOut } from '@/shared/hooks/use-sign-out';
import { Flex, FLEX_DIRECTIONS, SidebarInset, SidebarProvider } from '@ui';

export const MainLayout = () => {
  const currentUserQuery = useCurrentUserQuery();
  const signOut = useSignOut();
  const signOutDialog = useDisclosure();

  return (
    <QueryState
      isLoading={currentUserQuery.isPending}
      isError={currentUserQuery.isError}
      onRetry={() => currentUserQuery.refetch()}
      loading={<PageLoader />}
    >
      <SidebarProvider className="h-svh overflow-hidden">
        <RouteProgress />
        <AppSidebar onSignOut={signOutDialog.open} />
        <SidebarInset className="min-h-0 overflow-hidden">
          <AppHeader />
          <Flex
            asChild
            direction={FLEX_DIRECTIONS.COL}
            gap={6}
            className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6"
          >
            <main>
              <Outlet />
            </main>
          </Flex>
        </SidebarInset>
        <SignOutDialog
          open={signOutDialog.isOpen}
          onOpenChange={signOutDialog.setIsOpen}
          onConfirm={() => signOut.mutate()}
          isPending={signOut.isPending}
        />
      </SidebarProvider>
    </QueryState>
  );
};
