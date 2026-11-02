import { Avatar as AvatarPrimitive } from 'radix-ui';

import { AVATAR_SIZES } from './constants';
import type { AvatarProps } from './types';
import { cn } from '../../lib/cn';

export const Avatar = ({ className, size = AVATAR_SIZES.DEFAULT, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    data-size={size}
    className={cn(
      'group/avatar relative flex size-10 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-foreground/10 data-[size=lg]:size-14 data-[size=sm]:size-8',
      className,
    )}
    {...props}
  />
);
