import type { FieldSeparatorProps } from './types';
import { cn } from '../../lib/cn';
import { Separator } from '../separator/separator';

export const FieldSeparator = ({ children, className, ...props }: FieldSeparatorProps) => (
  <div
    data-slot="field-separator"
    data-content={Boolean(children)}
    className={cn('relative -my-2 h-5 text-sm', className)}
    {...props}
  >
    <Separator className="absolute inset-0 top-1/2" />
    {children && (
      <span
        data-slot="field-separator-content"
        className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      >
        {children}
      </span>
    )}
  </div>
);
