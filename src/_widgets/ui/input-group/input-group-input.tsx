import type { InputGroupInputProps } from './types';
import { inputGroupControlClassName } from './variant';
import { cn } from '../../lib/cn';
import { Input } from '../input/input';

export const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => (
  <Input
    data-slot="input-group-control"
    className={cn(inputGroupControlClassName, className)}
    {...props}
  />
);
