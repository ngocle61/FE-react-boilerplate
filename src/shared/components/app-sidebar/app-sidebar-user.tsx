import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAuthUser } from '@/core/hooks/use-auth-user';
import {
  Badge,
  BADGE_VARIANTS,
  DROPDOWN_MENU_ALIGNMENTS,
  DROPDOWN_MENU_ITEM_VARIANTS,
  DROPDOWN_MENU_SIDES,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  FLEX_ALIGNMENTS,
  Grid,
  SIDEBAR_MENU_BUTTON_SIZES,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@ui';

import type { AppSidebarUserProps } from './app-sidebar.type';
import { UserAvatar } from '../user-avatar/user-avatar';

export const AppSidebarUser = ({ onSignOut }: AppSidebarUserProps) => {
  const { t } = useTranslation();
  const user = useAuthUser();
  const { state } = useSidebar();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={SIDEBAR_MENU_BUTTON_SIZES.LG}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                fullName={user.fullName}
                avatarUrl={user.avatarUrl}
                className="rounded-lg"
              />
              <Grid className="flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </Grid>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={state.isMobile ? DROPDOWN_MENU_SIDES.BOTTOM : DROPDOWN_MENU_SIDES.RIGHT}
            align={DROPDOWN_MENU_ALIGNMENTS.END}
            sideOffset={4}
            className="min-w-56"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
                  <UserAvatar
                    fullName={user.fullName}
                    avatarUrl={user.avatarUrl}
                    className="rounded-lg"
                  />
                  <Grid className="flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.fullName}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </Grid>
                  <Badge variant={BADGE_VARIANTS.SECONDARY}>{t(`roles.${user.role}`)}</Badge>
                </Flex>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant={DROPDOWN_MENU_ITEM_VARIANTS.DESTRUCTIVE}
                onSelect={onSignOut}
              >
                <LogOutIcon />
                {t('account.signOut')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
