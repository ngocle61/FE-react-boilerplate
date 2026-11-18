import type { ComponentProps, ComponentType, Ref } from 'react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

import { PHONE_INPUT_DEFAULT_COUNTRY } from './constants';
import { PhoneCountrySelect } from './phone-country-select';
import { PhoneFlag } from './phone-flag';
import { PhoneNumberInput } from './phone-number-input';
import type { PhoneInputProps } from './types';
import { phoneInputVariants } from './variant';
import { cn } from '../../lib/cn';

const PhoneInputWithInputRef = PhoneInputWithCountrySelect as ComponentType<
  ComponentProps<typeof PhoneInputWithCountrySelect> & { ref?: Ref<HTMLInputElement> }
>;

export const PhoneInput = ({
  className,
  value,
  onValueChange,
  defaultCountry = PHONE_INPUT_DEFAULT_COUNTRY,
  ...props
}: PhoneInputProps) => (
  <PhoneInputWithInputRef
    data-slot="phone-input"
    className={cn(phoneInputVariants(), className)}
    flagComponent={PhoneFlag}
    countrySelectComponent={PhoneCountrySelect}
    inputComponent={PhoneNumberInput}
    smartCaret={false}
    international
    defaultCountry={defaultCountry}
    value={value || undefined}
    onChange={(nextValue) => onValueChange?.(nextValue ?? '')}
    {...props}
  />
);
