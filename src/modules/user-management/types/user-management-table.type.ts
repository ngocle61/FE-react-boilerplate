import type { PaginatedQueryResult } from '@/shared/types/pagination.type';

import type { UserRow } from './user-row.type';

export interface UserManagementTableProps {
  users: PaginatedQueryResult<UserRow>;
  page: number;
  onPageChange: (page: number) => void;
  onEditRequest: (row: UserRow) => void;
}
