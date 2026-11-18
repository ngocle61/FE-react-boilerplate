import { Flex, FLEX_JUSTIFICATIONS, TableCell, TableRow } from '@ui';

import { USER_MANAGEMENT_TABLE_COLUMN_COUNT } from '../../../constants/user-management-table.constant';
import type { UserManagementStatusRowProps } from '../../../types/user-management-status-row.type';

export const UserManagementStatusRow = ({ children }: UserManagementStatusRowProps) => (
  <TableRow>
    <TableCell colSpan={USER_MANAGEMENT_TABLE_COLUMN_COUNT}>
      <Flex justify={FLEX_JUSTIFICATIONS.CENTER} className="py-8">
        {children}
      </Flex>
    </TableCell>
  </TableRow>
);
