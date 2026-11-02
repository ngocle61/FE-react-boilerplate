import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { QUERY_STATES } from '@/shared/constants/query-state.constant';
import { Spinner, TableBody } from '@ui';

import { UserManagementStatusRow } from './user-management-status-row';
import { UserManagementTableRow } from './user-management-table-row/user-management-table-row';
import type { UserManagementTableBodyProps } from '../../../types/user-management-table-body.type';

export const UserManagementTableBody = ({
  queryState,
  rows,
  onEditRequest,
}: UserManagementTableBodyProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.USER_MANAGEMENT);

  switch (queryState) {
    case QUERY_STATES.LOADING:
      return (
        <TableBody>
          <UserManagementStatusRow>
            <Spinner className="size-6 text-muted-foreground" />
          </UserManagementStatusRow>
        </TableBody>
      );

    case QUERY_STATES.EMPTY:
      return (
        <TableBody>
          <UserManagementStatusRow>
            <p className="text-sm text-muted-foreground">{t('table.empty')}</p>
          </UserManagementStatusRow>
        </TableBody>
      );

    default:
      return (
        <TableBody>
          {rows.map((row) => (
            <UserManagementTableRow key={row.id} row={row} onEditRequest={onEditRequest} />
          ))}
        </TableBody>
      );
  }
};
