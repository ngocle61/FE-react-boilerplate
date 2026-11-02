import type { UserRow } from './user-row.type';

export interface UserManagementDialogsProps {
  isCreateOpen: boolean;
  onCreateOpenChange: (open: boolean) => void;
  editTarget: Nullable<UserRow>;
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
}
