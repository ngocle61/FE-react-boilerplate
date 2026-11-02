import { ChevronsUpDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PHONE_COUNTRY_SELECT_LABEL } from './constants';
import { PhoneCountryList } from './phone-country-list';
import { PhoneFlag } from './phone-flag';
import type { PhoneCountrySelectProps } from './types';
import { toCountryOptions } from './utils';
import { Button } from '../button/button';
import { BUTTON_VARIANTS } from '../button/constants';
import { useOptionList } from '../option-list/use-option-list';
import { POPOVER_ALIGNMENTS } from '../popover/constants';
import { Popover } from '../popover/popover';
import { PopoverContent } from '../popover/popover-content';
import { PopoverTrigger } from '../popover/popover-trigger';

export const PhoneCountrySelect = ({
  value,
  options,
  onChange,
  disabled,
  readOnly,
}: PhoneCountrySelectProps) => {
  const [open, setOpen] = useState(false);

  const countryOptions = useMemo(() => toCountryOptions(options), [options]);

  const optionList = useOptionList({
    options: countryOptions,
    onSelect: (option) => {
      onChange(option.value);
      setOpen(false);
      optionList.actions.reset();
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) optionList.actions.reset();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={BUTTON_VARIANTS.GHOST}
          disabled={disabled || readOnly}
          aria-label={PHONE_COUNTRY_SELECT_LABEL}
          className="h-full gap-1.5 rounded-none rounded-l-md border-r border-input px-3 shadow-none"
        >
          <PhoneFlag country={value} countryName={value ?? PHONE_COUNTRY_SELECT_LABEL} />
          <ChevronsUpDownIcon aria-hidden className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={POPOVER_ALIGNMENTS.START} className="w-72 gap-0 p-0">
        <PhoneCountryList value={value} optionList={optionList} />
      </PopoverContent>
    </Popover>
  );
};
