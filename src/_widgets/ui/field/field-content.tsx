import type { FieldContentProps } from './types';
import { cn } from '../../lib/cn';

export const FieldContent = ({ className, ...props }: FieldContentProps) => (
  <div
    data-slot="field-content"
    className={cn('group/field-content flex flex-1 flex-col gap-0.5 leading-snug', className)}
    {...props}
  />
);
