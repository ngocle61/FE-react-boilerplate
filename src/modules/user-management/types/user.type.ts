import type { Role } from '@/core/types/access.type';
import type { PageRequest } from '@/core/types/pagination.dto';
import type { UpdateUserPayload } from '@/core/types/user.dto';

export interface UserListFilterParams {
  search?: string;
  role?: Role;
  isActive?: boolean;
}

export interface UserListQueryParams extends UserListFilterParams, PageRequest {}

export interface UpdateUserVariables {
  id: string;
  payload: UpdateUserPayload;
}
