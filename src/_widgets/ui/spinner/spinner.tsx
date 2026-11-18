import { Loader2Icon } from 'lucide-react';

import { SPINNER_LABEL } from './constants';
import type { SpinnerProps } from './types';
import { cn } from '../../lib/cn';

export const Spinner = ({ className, ...props }: SpinnerProps) => (
  <Loader2Icon
    data-slot="spinner"
    role="status"
    aria-label={SPINNER_LABEL}
    className={cn('size-4 animate-spin', className)}
    {...props}
  />
);
