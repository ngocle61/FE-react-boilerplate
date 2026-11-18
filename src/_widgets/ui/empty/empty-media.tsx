import { EMPTY_MEDIA_VARIANTS } from './constants';
import type { EmptyMediaProps } from './types';
import { emptyMediaVariants } from './variant';
import { cn } from '../../lib/cn';

export const EmptyMedia = ({
  className,
  variant = EMPTY_MEDIA_VARIANTS.DEFAULT,
  ...props
}: EmptyMediaProps) => (
  <div
    data-slot="empty-icon"
    data-variant={variant}
    aria-hidden
    className={cn(emptyMediaVariants({ variant }), className)}
    {...props}
  />
);
