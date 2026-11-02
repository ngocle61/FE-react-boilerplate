import type { InputProps } from './types';
import { inputVariants } from './variant';
import { cn } from '../../lib/cn';

export const Input = ({ className, type, ...props }: InputProps) => (
  <input type={type} data-slot="input" className={cn(inputVariants(), className)} {...props} />
);
