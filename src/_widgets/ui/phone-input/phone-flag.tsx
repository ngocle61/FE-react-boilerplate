import { GlobeIcon } from 'lucide-react';
import flags from 'react-phone-number-input/flags';

import type { PhoneFlagProps } from './types';

export const PhoneFlag = ({ country, countryName }: PhoneFlagProps) => {
  const Flag = country ? flags[country] : undefined;

  return (
    <span
      aria-hidden
      data-slot="phone-flag"
      className="flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted [&_svg]:size-full"
    >
      {Flag ? <Flag title={countryName} /> : <GlobeIcon />}
    </span>
  );
};
