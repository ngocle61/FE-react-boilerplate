import type { AlertDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    data-slot="alert-description"
    className={cn(
      'text-sm text-balance text-muted-foreground group-has-[>svg]/alert:col-start-2 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
      className,
    )}
    {...props}
  />
);
