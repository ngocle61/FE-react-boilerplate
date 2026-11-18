import type { FieldSetProps } from './types';
import { cn } from '../../lib/cn';

export const FieldSet = ({ className, ...props }: FieldSetProps) => (
  <fieldset
    data-slot="field-set"
    className={cn(
      'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
      className,
    )}
    {...props}
  />
);
