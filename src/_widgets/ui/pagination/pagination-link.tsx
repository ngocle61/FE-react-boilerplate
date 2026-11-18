import type { PaginationLinkProps } from './types';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../button/constants';

export const PaginationLink = ({
  className,
  isActive = false,
  size = BUTTON_SIZES.ICON_SM,
  children,
  ...props
}: PaginationLinkProps) => (
  <Button
    asChild
    variant={isActive ? BUTTON_VARIANTS.OUTLINE : BUTTON_VARIANTS.GHOST}
    size={size}
    className={cn(className)}
  >
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    >
      {children}
    </a>
  </Button>
);
