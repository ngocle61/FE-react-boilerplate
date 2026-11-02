import type { Permission, Role } from './access.type';
import type { UserDto } from './user.dto';
import type { SESSION_END_REASONS } from '../constants/session.constant';

export interface AuthUser {
  id: ID;
  email: string;
  fullName: string;
  avatarUrl: Nullable<string>;
  role: Role;
  permissions?: readonly Permission[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: UserDto;
  tokens: AuthTokens;
}

export type SessionEndReason = (typeof SESSION_END_REASONS)[keyof typeof SESSION_END_REASONS];

export interface AuthState {
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
  endReason: Nullable<SessionEndReason>;
}

export interface AuthActions {
  startSession: (tokens: AuthTokens) => void;
  updateTokens: (tokens: AuthTokens) => void;
  endSession: (reason: SessionEndReason) => void;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}
