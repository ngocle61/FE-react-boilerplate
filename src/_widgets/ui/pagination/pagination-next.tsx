import { ChevronRightIcon } from 'lucide-react';

import { PAGINATION_NEXT_LABEL, PAGINATION_NEXT_TEXT } from './constants';
import { PaginationLink } from './pagination-link';
import type { PaginationStepProps } from './types';
import { cn } from '../../lib/cn';
import { ICON_PLACEMENTS } from '../../lib/constants';
import { BUTTON_SIZES } from '../button/constants';

export const PaginationNext = ({
  className,
  text = PAGINATION_NEXT_TEXT,
  size = BUTTON_SIZES.SM,
  ...props
}: PaginationStepProps) => (
  <PaginationLink
    aria-label={PAGINATION_NEXT_LABEL}
    size={size}
    className={cn(className)}
    {...props}
  >
    <span className="hidden sm:block">{text}</span>
    <ChevronRightIcon aria-hidden data-icon={ICON_PLACEMENTS.INLINE_END} />
  </PaginationLink>
);
