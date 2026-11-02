export const toggleValue = <TValue extends ID>(values: TValue[], value: TValue): TValue[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

export const removeValue = <TValue extends ID>(values: TValue[], value: TValue): TValue[] =>
  values.filter((item) => item !== value);

export const toSelectedOptions = <TValue extends ID>(
  options: readonly ValueOption<TValue>[],
  values: TValue[],
): ValueOption<TValue>[] => options.filter((option) => values.includes(option.value));

export const toSelectionSummary = <TValue extends ID>(
  selectedOptions: ValueOption<TValue>[],
  placeholder: string,
): string =>
  selectedOptions.length === 0
    ? placeholder
    : selectedOptions.map((option) => option.label).join(', ');
