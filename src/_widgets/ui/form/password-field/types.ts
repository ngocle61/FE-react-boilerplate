import type { FieldValues } from 'react-hook-form';

import type { InputFieldProps } from '../input-field/types';

export interface PasswordFieldProps<TValues extends FieldValues> extends Omit<
  InputFieldProps<TValues>,
  'type'
> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export interface PasswordToggleButtonProps {
  controlId: string;
  isVisible: boolean;
  showLabel: string;
  hideLabel: string;
  disabled?: boolean;
  onToggle: () => void;
}
