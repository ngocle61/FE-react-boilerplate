import { getCountryCallingCode, type Country } from 'react-phone-number-input';

import type { PhoneCountryEntry } from './types';

export const toCountryOptions = (entries: PhoneCountryEntry[]): ValueOption<Country>[] =>
  entries.flatMap(({ label, value }) => (value ? [{ label, value }] : []));

export const toCallingCodeLabel = (country: Country) => `+${getCountryCallingCode(country)}`;
