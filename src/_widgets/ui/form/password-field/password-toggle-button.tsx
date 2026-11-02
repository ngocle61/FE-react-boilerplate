import { EyeIcon, EyeOffIcon } from 'lucide-react';

import type { PasswordToggleButtonProps } from './types';
import { INPUT_GROUP_BUTTON_SIZES } from '../../input-group/constants';
import { InputGroupButton } from '../../input-group/input-group-button';

export const PasswordToggleButton = ({
  controlId,
  isVisible,
  showLabel,
  hideLabel,
  disabled,
  onToggle,
}: PasswordToggleButtonProps) => (
  <InputGroupButton
    size={INPUT_GROUP_BUTTON_SIZES.ICON_XS}
    disabled={disabled}
    aria-controls={controlId}
    aria-label={isVisible ? hideLabel : showLabel}
    onClick={onToggle}
  >
    {isVisible ? <EyeOffIcon aria-hidden /> : <EyeIcon aria-hidden />}
  </InputGroupButton>
);
