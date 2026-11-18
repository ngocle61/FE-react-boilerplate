import type { AuthUser } from '../types/auth.type';
import type { UserDto } from '../types/user.dto';

export const authConverter = {
  toAuthUser: (dto: UserDto): AuthUser => ({
    id: dto.id,
    email: dto.email,
    fullName: dto.fullName,
    avatarUrl: dto.avatarUrl ?? null,
    role: dto.role,
    permissions: dto.permissions,
  }),
};
