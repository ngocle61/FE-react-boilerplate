import type { SkeletonProps } from './types';
import { cn } from '../../lib/cn';

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    data-slot="skeleton"
    aria-hidden
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);
