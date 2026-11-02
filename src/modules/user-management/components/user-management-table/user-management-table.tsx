import { UsersIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { PaginatedTable } from '@/shared/components/paginated-table/paginated-table';
import { StatusView } from '@/shared/components/status-view/status-view';
import { QUERY_STATES } from '@/shared/constants/query-state.constant';
import { resolveQueryState } from '@/shared/utils/query-state.util';
import { Button, BUTTON_VARIANTS, TableActionsHead, TableHead, TableHeader, TableRow } from '@ui';

import { UserManagementTableBody } from './user-management-table-body/user-management-table-body';
import type { UserManagementTableProps } from '../../types/user-management-table.type';

export const UserManagementTable = ({
  users,
  page,
  onPageChange,
  onEditRequest,
}: UserManagementTableProps) => {
  const { t } = useTranslation([I18N_NAMESPACES.USER_MANAGEMENT, I18N_NAMESPACES.COMMON]);

  const queryState = resolveQueryState({
    isLoading: users.isLoading,
    isError: users.isError,
    isEmpty: users.rows.length === 0,
    hasEmptyNode: true,
  });

  if (queryState === QUERY_STATES.ERROR) {
    return (
      <StatusView
        icon={UsersIcon}
        title={t('common:queryState.errorTitle')}
        description={t('common:queryState.errorDescription')}
      >
        <Button variant={BUTTON_VARIANTS.OUTLINE} onClick={() => void users.refetch()}>
          {t('common:actions.retry')}
        </Button>
      </StatusView>
    );
  }

  return (
    <PaginatedTable
      summary={t('table.totalLabel', { count: users.total })}
      page={page}
      totalPages={users.totalPages}
      onPageChange={onPageChange}
    >
      <TableHeader>
        <TableRow>
          <TableHead>{t('table.columns.user')}</TableHead>
          <TableHead>{t('table.columns.email')}</TableHead>
          <TableHead>{t('table.columns.role')}</TableHead>
          <TableHead>{t('table.columns.status')}</TableHead>
          <TableHead>{t('table.columns.createdAt')}</TableHead>
          <TableActionsHead>{t('table.columns.actions')}</TableActionsHead>
        </TableRow>
      </TableHeader>
      <UserManagementTableBody
        queryState={queryState}
        rows={users.rows}
        onEditRequest={onEditRequest}
      />
    </PaginatedTable>
  );
};
