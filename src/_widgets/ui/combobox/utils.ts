export const findOption = <TValue extends ID>(
  options: readonly ValueOption<TValue>[],
  value: Maybe<TValue>,
): Maybe<ValueOption<TValue>> =>
  value === undefined ? undefined : options.find((option) => option.value === value);

export const toSelectedOption = <TValue extends ID>(
  options: readonly ValueOption<TValue>[],
  value: Maybe<TValue>,
  rememberedOption: Maybe<ValueOption<TValue>>,
): Maybe<ValueOption<TValue>> =>
  findOption(options, value) ?? (rememberedOption?.value === value ? rememberedOption : undefined);
