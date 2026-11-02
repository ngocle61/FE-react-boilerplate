import type { Role } from '@/core/types/access.type';
import type { AuthUser } from '@/core/types/auth.type';

export const createAuthUser = (role: Role, overrides: Partial<AuthUser> = {}): AuthUser => ({
  id: `user-${role.toLowerCase()}`,
  email: `${role.toLowerCase()}@example.com`,
  fullName: `Test ${role}`,
  avatarUrl: null,
  role,
  ...overrides,
});
