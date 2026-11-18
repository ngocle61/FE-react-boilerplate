import type { InputGroupTextProps } from './types';
import { cn } from '../../lib/cn';

export const InputGroupText = ({ className, ...props }: InputGroupTextProps) => (
  <span
    data-slot="input-group-text"
    className={cn(
      "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  />
);
