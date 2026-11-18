import { ROLE_PERMISSIONS } from '@/core/constants/role-permissions.constant';
import { queryClient } from '@/core/libs/query-client';
import { authQueries } from '@/core/queries/auth.queries';
import { useAuthStore } from '@/core/store/auth.store';
import type { Role } from '@/core/types/access.type';
import type { UserDto } from '@/core/types/user.dto';

export const createUserDto = (role: Role, overrides: Partial<UserDto> = {}): UserDto => ({
  id: `user-${role.toLowerCase()}`,
  email: `${role.toLowerCase()}@example.com`,
  fullName: `Test ${role}`,
  avatarUrl: null,
  role,
  permissions: [...ROLE_PERMISSIONS[role]],
  ...overrides,
});

export const signInAs = (role: Role): void => {
  queryClient.setQueryData(authQueries.currentUser().queryKey, createUserDto(role));
  useAuthStore.setState({
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    endReason: null,
  });
};

export const resetSession = (): void => {
  queryClient.clear();
  useAuthStore.setState({ accessToken: null, refreshToken: null, endReason: null });
};
