import type { QueryStateKind } from '@/shared/types/query-state.type';

import type { UserManagementTableProps } from './user-management-table.type';
import type { UserRow } from './user-row.type';

export interface UserManagementTableBodyProps extends Pick<
  UserManagementTableProps,
  'onEditRequest'
> {
  queryState: QueryStateKind;
  rows: UserRow[];
}
