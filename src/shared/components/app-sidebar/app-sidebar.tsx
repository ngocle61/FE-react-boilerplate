import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ENV } from '@/core/constants/env.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { useAccess } from '@/core/hooks/use-access';
import {
  Grid,
  Sidebar,
  SIDEBAR_COLLAPSIBLE_MODES,
  SIDEBAR_MENU_BUTTON_SIZES,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@ui';

import { AppSidebarNav } from './app-sidebar-nav';
import { AppSidebarUser } from './app-sidebar-user';
import type { AppSidebarProps } from './app-sidebar.type';
import { NAVIGATION_GROUPS } from '../../constants/navigation.constant';
import { filterNavigationByAccess } from '../../utils/navigation.util';
import { AppLogo } from '../app-logo/app-logo';

export const AppSidebar = ({ onSignOut }: AppSidebarProps) => {
  const { t } = useTranslation();
  const { can } = useAccess();

  const groups = filterNavigationByAccess(NAVIGATION_GROUPS, can);

  return (
    <Sidebar collapsible={SIDEBAR_COLLAPSIBLE_MODES.ICON}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={SIDEBAR_MENU_BUTTON_SIZES.LG} asChild>
              <Link to={ROUTE_PATHS.ROOT}>
                <AppLogo className="bg-sidebar-primary text-sidebar-primary-foreground" />
                <Grid className="flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{ENV.APP_NAME}</span>
                  <span className="truncate text-xs text-muted-foreground">{t('app.tagline')}</span>
                </Grid>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav groups={groups} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser onSignOut={onSignOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
