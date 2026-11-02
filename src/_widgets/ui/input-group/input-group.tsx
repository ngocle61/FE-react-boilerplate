import type { InputGroupProps } from './types';
import { inputGroupVariants } from './variant';
import { cn } from '../../lib/cn';

export const InputGroup = ({ className, ...props }: InputGroupProps) => (
  <div
    data-slot="input-group"
    role="group"
    className={cn(inputGroupVariants(), className)}
    {...props}
  />
);
