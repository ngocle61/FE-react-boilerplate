import { Slot } from 'radix-ui';

import type { BreadcrumbLinkProps } from './types';
import { cn } from '../../lib/cn';

export const BreadcrumbLink = ({ asChild = false, className, ...props }: BreadcrumbLinkProps) => {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        'rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40',
        className,
      )}
      {...props}
    />
  );
};
