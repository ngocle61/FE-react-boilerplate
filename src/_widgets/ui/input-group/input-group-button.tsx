import { INPUT_GROUP_BUTTON_SIZES } from './constants';
import type { InputGroupButtonProps } from './types';
import { inputGroupButtonVariants } from './variant';
import { cn } from '../../lib/cn';
import { Button } from '../button/button';
import { BUTTON_TYPES, BUTTON_VARIANTS } from '../button/constants';

export const InputGroupButton = ({
  className,
  type = BUTTON_TYPES.BUTTON,
  variant = BUTTON_VARIANTS.GHOST,
  size = INPUT_GROUP_BUTTON_SIZES.XS,
  ...props
}: InputGroupButtonProps) => (
  <Button
    type={type}
    data-size={size}
    variant={variant}
    className={cn(inputGroupButtonVariants({ size }), className)}
    {...props}
  />
);
