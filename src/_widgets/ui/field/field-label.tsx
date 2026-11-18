import type { FieldLabelProps } from './types';
import { cn } from '../../lib/cn';
import { Label } from '../label/label';

export const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <Label
    data-slot="field-label"
    className={cn(
      'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/40 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-accent has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/20 *:data-[slot=field]:p-3',
      className,
    )}
    {...props}
  />
);
