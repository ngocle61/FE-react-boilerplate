import type { AvatarGroupProps } from './types';
import { cn } from '../../lib/cn';

export const AvatarGroup = ({ className, ...props }: AvatarGroupProps) => (
  <div
    data-slot="avatar-group"
    className={cn(
      'group/avatar-group flex *:not-first:-ml-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
      className,
    )}
    {...props}
  />
);
