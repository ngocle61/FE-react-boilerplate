import { ChevronLeftIcon } from 'lucide-react';

import { PAGINATION_PREVIOUS_LABEL, PAGINATION_PREVIOUS_TEXT } from './constants';
import { PaginationLink } from './pagination-link';
import type { PaginationStepProps } from './types';
import { cn } from '../../lib/cn';
import { ICON_PLACEMENTS } from '../../lib/constants';
import { BUTTON_SIZES } from '../button/constants';

export const PaginationPrevious = ({
  className,
  text = PAGINATION_PREVIOUS_TEXT,
  size = BUTTON_SIZES.SM,
  ...props
}: PaginationStepProps) => (
  <PaginationLink
    aria-label={PAGINATION_PREVIOUS_LABEL}
    size={size}
    className={cn(className)}
    {...props}
  >
    <ChevronLeftIcon aria-hidden data-icon={ICON_PLACEMENTS.INLINE_START} />
    <span className="hidden sm:block">{text}</span>
  </PaginationLink>
);
