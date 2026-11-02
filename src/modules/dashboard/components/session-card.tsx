import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { PERMISSION_SEPARATOR } from '@/core/constants/permissions.constant';
import { useAccess } from '@/core/hooks/use-access';
import { useAuthUser } from '@/core/hooks/use-auth-user';
import type { Permission } from '@/core/types/access.type';
import { UserAvatar } from '@/shared/components/user-avatar/user-avatar';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_DIRECTIONS,
  FLEX_JUSTIFICATIONS,
  ICON_PLACEMENTS,
} from '@ui';

import {
  PERMISSION_ACTION_META,
  PERMISSION_FALLBACK_BADGE_VARIANT,
  PERMISSION_FALLBACK_ICON,
  PERMISSION_RESOURCE_META,
  SESSION_ROLE_BADGE_VARIANT,
} from '../constants/session-card.constant';
import type { PermissionGroup } from '../types/session-card.type';

const groupPermissionsByResource = (permissions: readonly Permission[]): PermissionGroup[] => {
  const order: string[] = [];
  const actionsByResource = new Map<string, string[]>();

  permissions.forEach((permission) => {
    const [resource, action] = permission.split(PERMISSION_SEPARATOR);
    if (!resource || !action) return;

    if (!actionsByResource.has(resource)) {
      order.push(resource);
      actionsByResource.set(resource, []);
    }
    actionsByResource.get(resource)?.push(action);
  });

  return order.map((resource) => ({ resource, actions: actionsByResource.get(resource) ?? [] }));
};

export const SessionCard = () => {
  const { t } = useTranslation([I18N_NAMESPACES.DASHBOARD, I18N_NAMESPACES.COMMON]);
  const user = useAuthUser();
  const { role, permissions } = useAccess();

  if (!user) return null;

  const permissionGroups = groupPermissionsByResource(permissions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('session.title')}</CardTitle>
        <CardDescription>{t('session.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Flex direction={FLEX_DIRECTIONS.COL} gap={6}>
          <Flex align={FLEX_ALIGNMENTS.CENTER} gap={3}>
            <UserAvatar fullName={user.fullName} avatarUrl={user.avatarUrl} className="size-10" />
            <Flex direction={FLEX_DIRECTIONS.COL} className="min-w-0 flex-1">
              <span className="truncate font-medium">{user.fullName}</span>
              <span className="truncate text-sm text-muted-foreground">{user.email}</span>
            </Flex>
            {role && (
              <Badge variant={SESSION_ROLE_BADGE_VARIANT}>{t(`common:roles.${role}`)}</Badge>
            )}
          </Flex>
          <Flex direction={FLEX_DIRECTIONS.COL} gap={1}>
            <span className="text-sm font-medium">{t('session.permissions')}</span>
            <Flex asChild direction={FLEX_DIRECTIONS.COL} className="divide-y">
              <ul>
                {permissionGroups.map(({ resource, actions }) => {
                  const meta = PERMISSION_RESOURCE_META[resource];
                  const ResourceIcon = meta?.icon ?? PERMISSION_FALLBACK_ICON;

                  return (
                    <Flex
                      key={resource}
                      asChild
                      align={FLEX_ALIGNMENTS.CENTER}
                      gap={3}
                      className="py-2 first:pt-0 last:pb-0"
                    >
                      <li>
                        <ResourceIcon className="size-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 truncate text-sm">
                          {meta ? t(meta.labelKey, { ns: I18N_NAMESPACES.COMMON }) : resource}
                        </span>
                        <Flex justify={FLEX_JUSTIFICATIONS.END} gap={1.5} wrap>
                          {actions.map((action) => {
                            const actionMeta = PERMISSION_ACTION_META[action];
                            const ActionIcon = actionMeta?.icon ?? PERMISSION_FALLBACK_ICON;

                            return (
                              <Badge
                                key={action}
                                variant={actionMeta?.variant ?? PERMISSION_FALLBACK_BADGE_VARIANT}
                              >
                                <ActionIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
                                {t(`session.actions.${action}`, action)}
                              </Badge>
                            );
                          })}
                        </Flex>
                      </li>
                    </Flex>
                  );
                })}
              </ul>
            </Flex>
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};
