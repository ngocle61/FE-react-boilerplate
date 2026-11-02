import type { AvatarGroupCountProps } from './types';
import { cn } from '../../lib/cn';

export const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountProps) => (
  <div
    data-slot="avatar-group-count"
    className={cn(
      'relative flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-14 group-has-data-[size=sm]/avatar-group:size-8 [&>svg]:size-4',
      className,
    )}
    {...props}
  />
);
