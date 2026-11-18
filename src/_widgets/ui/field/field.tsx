import { FIELD_ORIENTATIONS } from './constants';
import type { FieldProps } from './types';
import { fieldVariants } from './variant';
import { cn } from '../../lib/cn';

export const Field = ({
  className,
  orientation = FIELD_ORIENTATIONS.VERTICAL,
  ...props
}: FieldProps) => (
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(fieldVariants({ orientation }), className)}
    {...props}
  />
);
