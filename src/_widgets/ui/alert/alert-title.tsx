import type { AlertTitleProps } from './types';
import { cn } from '../../lib/cn';

export const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    data-slot="alert-title"
    className={cn(
      'font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3',
      className,
    )}
    {...props}
  />
);
