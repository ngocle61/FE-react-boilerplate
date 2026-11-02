import type { FieldTitleProps } from './types';
import { cn } from '../../lib/cn';

export const FieldTitle = ({ className, ...props }: FieldTitleProps) => (
  <div
    data-slot="field-label"
    className={cn(
      'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
      className,
    )}
    {...props}
  />
);
