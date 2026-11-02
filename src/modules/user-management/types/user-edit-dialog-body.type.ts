import type { UserRow } from './user-row.type';

export interface UserEditDialogBodyProps {
  user: UserRow;
  onOpenChange: (open: boolean) => void;
}
