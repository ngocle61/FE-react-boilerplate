import type { UserManagementTableProps } from './user-management-table.type';
import type { UserRow } from './user-row.type';

export interface UserManagementTableRowProps extends Pick<
  UserManagementTableProps,
  'onEditRequest'
> {
  row: UserRow;
}
