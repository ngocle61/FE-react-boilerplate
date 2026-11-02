import type { AvatarBadgeProps } from './types';
import { cn } from '../../lib/cn';

export const AvatarBadge = ({ className, ...props }: AvatarBadgeProps) => (
  <span
    data-slot="avatar-badge"
    className={cn(
      'absolute right-0 bottom-0 z-10 inline-flex size-3 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none group-data-[size=lg]/avatar:size-3.5 group-data-[size=sm]/avatar:size-2.5 [&>svg]:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
      className,
    )}
    {...props}
  />
);
