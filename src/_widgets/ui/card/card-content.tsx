import type { CardContentProps } from './types';
import { cn } from '../../lib/cn';

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
);
