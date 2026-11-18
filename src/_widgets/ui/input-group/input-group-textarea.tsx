import type { InputGroupTextareaProps } from './types';
import { inputGroupControlClassName } from './variant';
import { cn } from '../../lib/cn';
import { Textarea } from '../textarea/textarea';

export const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => (
  <Textarea
    data-slot="input-group-control"
    className={cn(inputGroupControlClassName, 'resize-none py-2.5', className)}
    {...props}
  />
);
