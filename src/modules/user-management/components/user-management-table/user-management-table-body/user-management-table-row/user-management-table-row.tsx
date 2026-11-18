import { EllipsisVerticalIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { useAuthUser } from '@/core/hooks/use-auth-user';
import { formatDate } from '@/core/utils/date.util';
import { UserAvatar } from '@/shared/components/user-avatar/user-avatar';
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DROPDOWN_MENU_ALIGNMENTS,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  FLEX_ALIGNMENTS,
  TableActionsCell,
  TableCell,
  TableRow,
} from '@ui';

import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';
import { useUpdateUser } from '../../../../hooks/use-update-user';
import type { UserManagementTableRowProps } from '../../../../types/user-management-table-row.type';

export const UserManagementTableRow = ({ row, onEditRequest }: UserManagementTableRowProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.USER_MANAGEMENT);
  const authUser = useAuthUser();
  const updateUser = useUpdateUser();

  const isSelf = row.id === authUser?.id;
  const selfActionTitle = isSelf ? t('actions.cannotModifySelf') : undefined;

  const handleToggleActive = () => {
    updateUser.mutate(
      { id: row.id, payload: { isActive: !row.isActive } },
      {
        onSuccess: () =>
          toast.success(
            row.isActive ? t('actions.deactivateSuccess') : t('actions.activateSuccess'),
          ),
      },
    );
  };

  return (
    <TableRow>
      <TableCell>
        <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
          <UserAvatar fullName={row.fullName} avatarUrl={row.avatarUrl} className="size-8" />
          <span className="font-medium">{row.fullName}</span>
        </Flex>
      </TableCell>
      <TableCell className="text-muted-foreground">{row.email}</TableCell>
      <TableCell>
        <UserRoleBadge role={row.role} />
      </TableCell>
      <TableCell>
        <UserStatusBadge isActive={row.isActive} />
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(row.createdAt, i18n.language)}
      </TableCell>
      <TableActionsCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={BUTTON_VARIANTS.GHOST}
              size={BUTTON_SIZES.ICON_SM}
              aria-label={t('table.columns.actions')}
            >
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={DROPDOWN_MENU_ALIGNMENTS.END}>
            <DropdownMenuItem
              disabled={isSelf}
              title={selfActionTitle}
              onSelect={() => onEditRequest(row)}
            >
              {t('actions.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isSelf || updateUser.isPending}
              title={selfActionTitle}
              onSelect={handleToggleActive}
            >
              {row.isActive ? t('actions.deactivate') : t('actions.activate')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableActionsCell>
    </TableRow>
  );
};
