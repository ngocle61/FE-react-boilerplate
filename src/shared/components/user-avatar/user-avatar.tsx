import { Avatar, AvatarFallback, AvatarImage } from '@ui';

import type { UserAvatarProps } from './user-avatar.type';
import { toInitials } from '../../utils/string.util';

export const UserAvatar = ({ fullName, avatarUrl, className }: UserAvatarProps) => (
  <Avatar className={className}>
    {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
    <AvatarFallback>{toInitials(fullName)}</AvatarFallback>
  </Avatar>
);
