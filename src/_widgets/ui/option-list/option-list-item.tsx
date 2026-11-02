import { CheckIcon } from 'lucide-react';

import type { OptionListItemProps } from './types';
import { preventFocusLoss } from './utils';
import { cn } from '../../lib/cn';

export const OptionListItem = ({
  className,
  children,
  isSelected = false,
  isActive = false,
  disabled = false,
  ...props
}: OptionListItemProps) => (
  <div
    role="option"
    tabIndex={-1}
    data-slot="option-list-item"
    aria-selected={isSelected}
    aria-disabled={disabled}
    data-active={isActive}
    data-disabled={disabled}
    onMouseDown={preventFocusLoss}
    className={cn(
      'relative flex cursor-pointer items-center gap-2 rounded-md py-2 pr-8 pl-2 text-sm outline-none select-none data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <CheckIcon
      aria-hidden
      className={cn('absolute right-2 size-4 text-primary', !isSelected && 'invisible')}
    />
  </div>
);
