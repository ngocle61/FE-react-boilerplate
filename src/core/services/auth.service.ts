import { authApi } from '../apis/auth.api';
import { useAuthStore } from '../store/auth.store';
import type { UserDto } from '../types/user.dto';

export const authService = {
  getCurrentUser: async (signal?: AbortSignal): Promise<UserDto> => {
    const { data } = await authApi.getMe(signal);
    return data;
  },

  signOut: async (): Promise<void> => {
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) return;
    await authApi.signOut({ refreshToken });
  },
};
