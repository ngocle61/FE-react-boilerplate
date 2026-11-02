import type { FieldDescriptionProps } from './types';
import { cn } from '../../lib/cn';

export const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p
    data-slot="field-description"
    className={cn(
      'text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance last:mt-0 nth-last-2:-mt-1 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary [[data-variant=legend]+&]:-mt-1.5',
      className,
    )}
    {...props}
  />
);
