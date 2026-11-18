import type { EmptyDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => (
  <p
    data-slot="empty-description"
    className={cn(
      'text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      className,
    )}
    {...props}
  />
);
