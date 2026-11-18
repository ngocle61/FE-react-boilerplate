import type { Role } from '@/core/types/access.type';
import type { UserListItemDto } from '@/core/types/user.dto';

export interface UserRow {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: Nullable<string>;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  raw: UserListItemDto;
}
