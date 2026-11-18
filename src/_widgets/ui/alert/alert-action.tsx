import type { AlertActionProps } from './types';
import { cn } from '../../lib/cn';

export const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div data-slot="alert-action" className={cn('absolute top-2 right-2', className)} {...props} />
);
