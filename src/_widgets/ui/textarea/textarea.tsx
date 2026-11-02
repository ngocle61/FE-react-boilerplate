import type { TextareaProps } from './types';
import { textareaVariants } from './variant';
import { cn } from '../../lib/cn';

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea data-slot="textarea" className={cn(textareaVariants(), className)} {...props} />
);
