import type { z } from 'zod';

import type {
  zUserListItem,
  zUserListResponse,
  zUserResponse,
  zUsersCreateBody,
  zUsersListQuery,
  zUserSummary,
  zUsersUpdateBody,
} from '../contract/zod.gen';

export type UserDto = z.infer<typeof zUserResponse>;

export type UserSummaryDto = z.infer<typeof zUserSummary>;

export type UserListItemDto = z.infer<typeof zUserListItem>;

export type UserListResponseDto = z.infer<typeof zUserListResponse>;

export type UserListRequestParams = z.input<typeof zUsersListQuery>;

export type CreateUserPayload = z.input<typeof zUsersCreateBody>;

export type UpdateUserPayload = z.input<typeof zUsersUpdateBody>;
