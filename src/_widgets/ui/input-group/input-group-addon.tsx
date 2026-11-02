import { INPUT_GROUP_ADDON_ALIGNMENTS } from './constants';
import type { InputGroupAddonProps } from './types';
import { focusInputGroupControl } from './utils';
import { inputGroupAddonVariants } from './variant';
import { cn } from '../../lib/cn';

export const InputGroupAddon = ({
  className,
  align = INPUT_GROUP_ADDON_ALIGNMENTS.INLINE_START,
  onClick,
  ...props
}: InputGroupAddonProps) => (
  <div
    role="presentation"
    data-slot="input-group-addon"
    data-align={align}
    className={cn(inputGroupAddonVariants({ align }), className)}
    onClick={(event) => {
      onClick?.(event);
      focusInputGroupControl(event);
    }}
    {...props}
  />
);
