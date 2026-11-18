import { Avatar as AvatarPrimitive } from 'radix-ui';

import type { AvatarImageProps } from './types';
import { cn } from '../../lib/cn';

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <AvatarPrimitive.Image
    data-slot="avatar-image"
    className={cn('aspect-square size-full rounded-[inherit] object-cover', className)}
    {...props}
  />
);
