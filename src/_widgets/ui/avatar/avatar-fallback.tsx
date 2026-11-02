import { Avatar as AvatarPrimitive } from 'radix-ui';

import type { AvatarFallbackProps } from './types';
import { cn } from '../../lib/cn';

export const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => (
  <AvatarPrimitive.Fallback
    data-slot="avatar-fallback"
    className={cn(
      'flex size-full items-center justify-center rounded-[inherit] bg-muted text-sm font-semibold text-muted-foreground group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs',
      className,
    )}
    {...props}
  />
);
