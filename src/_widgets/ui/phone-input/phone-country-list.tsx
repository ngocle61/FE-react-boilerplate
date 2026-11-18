import { PHONE_COUNTRY_EMPTY_TEXT, PHONE_COUNTRY_SEARCH_PLACEHOLDER } from './constants';
import { PhoneFlag } from './phone-flag';
import type { PhoneCountryListProps } from './types';
import { toCallingCodeLabel } from './utils';
import { OptionList } from '../option-list/option-list';
import { OptionListEmpty } from '../option-list/option-list-empty';
import { OptionListItem } from '../option-list/option-list-item';
import { OptionListSearch } from '../option-list/option-list-search';

export const PhoneCountryList = ({ value, optionList }: PhoneCountryListProps) => {
  const { state, actions, getOptionId } = optionList;
  const hasOptions = state.filteredOptions.length > 0;

  return (
    <>
      <OptionListSearch
        listId={state.listId}
        activeOptionId={hasOptions ? getOptionId(state.activeIndex) : undefined}
        value={state.query}
        placeholder={PHONE_COUNTRY_SEARCH_PLACEHOLDER}
        aria-label={PHONE_COUNTRY_SEARCH_PLACEHOLDER}
        onChange={(event) => actions.changeQuery(event.target.value)}
        onKeyDown={actions.handleKeyDown}
      />
      {hasOptions ? (
        <OptionList id={state.listId} className="max-h-72">
          {state.filteredOptions.map((option, index) => (
            <OptionListItem
              key={option.value}
              id={getOptionId(index)}
              isSelected={option.value === value}
              isActive={index === state.activeIndex}
              onMouseEnter={() => actions.setActiveIndex(index)}
              onClick={() => actions.selectOption(option)}
            >
              <PhoneFlag country={option.value} countryName={option.label} />
              <span className="flex-1 truncate">{option.label}</span>
              <span className="text-muted-foreground">{toCallingCodeLabel(option.value)}</span>
            </OptionListItem>
          ))}
        </OptionList>
      ) : (
        <OptionListEmpty>{PHONE_COUNTRY_EMPTY_TEXT}</OptionListEmpty>
      )}
    </>
  );
};
