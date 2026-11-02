import { Dialog, DialogContent } from '@ui';

import { UserEditDialogBody } from './user-edit-dialog-body';
import type { UserEditDialogProps } from '../../../types/user-edit-dialog.type';

export const UserEditDialog = ({ user, open, onOpenChange }: UserEditDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      {user && <UserEditDialogBody key={user.id} user={user} onOpenChange={onOpenChange} />}
    </DialogContent>
  </Dialog>
);
