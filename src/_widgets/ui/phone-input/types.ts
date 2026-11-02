import type { ComponentProps } from 'react';
import type { Country } from 'react-phone-number-input';

import type { OptionListController } from '../option-list/types';

export type { Country };

export interface PhoneInputProps extends Omit<
  ComponentProps<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'type'
> {
  value?: Nillable<string>;
  onValueChange?: (value: string) => void;
  defaultCountry?: Country;
}

export interface PhoneCountryEntry {
  label: string;
  value: Maybe<Country>;
}

export interface PhoneCountrySelectProps {
  value: Maybe<Country>;
  options: PhoneCountryEntry[];
  onChange: (country: Country) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface PhoneCountryListProps {
  value: Maybe<Country>;
  optionList: OptionListController<Country>;
}

export interface PhoneFlagProps {
  country: Maybe<Country>;
  countryName: string;
}

export type PhoneNumberInputProps = ComponentProps<'input'>;
