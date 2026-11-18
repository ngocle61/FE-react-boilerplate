import type { PaginatedResponse } from '@/core/types/pagination.dto';
import type { UserListItemDto, UserListResponseDto } from '@/core/types/user.dto';

import type { EditUserFormValues } from '../types/user-form.type';
import type { UserRow } from '../types/user-row.type';

export const userConverter = {
  toRow: (dto: UserListItemDto): UserRow => ({
    id: dto.id,
    email: dto.email,
    fullName: dto.fullName,
    avatarUrl: dto.avatarUrl,
    role: dto.role,
    isActive: dto.isActive,
    createdAt: new Date(dto.createdAt),
    raw: dto,
  }),

  toRows: (dtos: UserListItemDto[]): UserRow[] => dtos.map(userConverter.toRow),

  toPage: (dto: UserListResponseDto): PaginatedResponse<UserRow> => ({
    ...dto,
    items: userConverter.toRows(dto.items),
  }),

  toEditFormValues: ({ fullName, role, isActive }: UserRow): EditUserFormValues => ({
    fullName,
    role,
    isActive,
  }),
};
