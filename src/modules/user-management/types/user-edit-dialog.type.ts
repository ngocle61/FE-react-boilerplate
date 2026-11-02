import type { UserRow } from './user-row.type';

export interface UserEditDialogProps {
  user: Nullable<UserRow>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
