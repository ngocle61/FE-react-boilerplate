import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@ui';

import type { AppSidebarNavProps } from './app-sidebar.type';
import { isNavigationPathActive } from '../../utils/navigation.util';

export const AppSidebarNav = ({ groups }: AppSidebarNavProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { actions } = useSidebar();

  return groups.map((group) => (
    <SidebarGroup key={group.key}>
      <SidebarGroupLabel>{t(group.labelKey)}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map(({ key, labelKey, href, icon: Icon }) => (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                asChild
                isActive={isNavigationPathActive(pathname, href)}
                tooltip={t(labelKey)}
              >
                <Link to={href} onClick={() => actions.setOpenMobile(false)}>
                  <Icon aria-hidden />
                  <span>{t(labelKey)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};
