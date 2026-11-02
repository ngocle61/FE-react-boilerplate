import { PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { PERMISSIONS } from '@/core/constants/permissions.constant';
import { Can } from '@/shared/components/can/can';
import { useHistoryRestoreKey } from '@/shared/hooks/use-history-restore-key';
import { Button, Flex, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS, ICON_PLACEMENTS } from '@ui';

import { UserManagementFilters } from './user-management-filters';
import type { UserManagementToolbarProps } from '../../types/user-management-toolbar.type';

export const UserManagementToolbar = ({ onNewClick }: UserManagementToolbarProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.USER_MANAGEMENT);
  const restoreKey = useHistoryRestoreKey();

  return (
    <Flex align={FLEX_ALIGNMENTS.CENTER} justify={FLEX_JUSTIFICATIONS.BETWEEN} gap={2} wrap>
      <UserManagementFilters key={restoreKey} />
      <Can permissions={[PERMISSIONS.USER_MANAGE]}>
        <Button onClick={onNewClick}>
          <PlusIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
          {t('toolbar.newUser')}
        </Button>
      </Can>
    </Flex>
  );
};
