import type { CardDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <p
    data-slot="card-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
