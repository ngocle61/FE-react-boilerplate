import { ChevronRightIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@ui';

import type { AppSidebarNavParentProps } from './app-sidebar.type';
import { findActiveNavigationHref, toNavigationHref } from '../../utils/navigation.util';

export const AppSidebarNavParent = ({ item }: AppSidebarNavParentProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { actions } = useSidebar();

  const label = t(item.labelKey);
  const activeHref = findActiveNavigationHref(item.children, pathname);
  const Icon = item.icon;

  const closeMobile = () => actions.setOpenMobile(false);

  return (
    <Collapsible asChild defaultOpen={activeHref !== null}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={activeHref !== null} tooltip={label}>
          <Link to={toNavigationHref(item)} onClick={closeMobile}>
            <Icon aria-hidden />
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
        <CollapsibleTrigger asChild>
          <SidebarMenuAction
            aria-label={t('navigation.toggleSection', { section: label })}
            className="data-[state=open]:rotate-90"
          >
            <ChevronRightIcon aria-hidden />
          </SidebarMenuAction>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child) => (
              <SidebarMenuSubItem key={child.key}>
                <SidebarMenuSubButton asChild isActive={child.href === activeHref}>
                  <Link to={child.href} onClick={closeMobile}>
                    <span>{t(child.labelKey)}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
