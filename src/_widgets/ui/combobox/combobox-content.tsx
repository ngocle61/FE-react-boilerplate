import type { ComboboxContentProps } from './types';
import { OptionList } from '../option-list/option-list';
import { OptionListEmpty } from '../option-list/option-list-empty';
import { OptionListItem } from '../option-list/option-list-item';
import { OptionListSearch } from '../option-list/option-list-search';

export const ComboboxContent = <TValue extends ID>({
  value,
  searchPlaceholder,
  emptyText,
  optionList,
  onQueryChange,
}: ComboboxContentProps<TValue>) => {
  const { state, actions, getOptionId } = optionList;
  const hasOptions = state.filteredOptions.length > 0;

  return (
    <>
      <OptionListSearch
        listId={state.listId}
        activeOptionId={hasOptions ? getOptionId(state.activeIndex) : undefined}
        value={state.query}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={actions.handleKeyDown}
      />
      {hasOptions ? (
        <OptionList id={state.listId}>
          {state.filteredOptions.map((option, index) => (
            <OptionListItem
              key={option.value}
              id={getOptionId(index)}
              isSelected={option.value === value}
              isActive={index === state.activeIndex}
              disabled={option.disabled}
              onMouseEnter={() => actions.setActiveIndex(index)}
              onClick={() => actions.selectOption(option)}
            >
              {option.label}
            </OptionListItem>
          ))}
        </OptionList>
      ) : (
        <OptionListEmpty>{emptyText}</OptionListEmpty>
      )}
    </>
  );
};
