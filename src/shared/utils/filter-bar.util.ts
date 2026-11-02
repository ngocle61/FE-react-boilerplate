import type { FieldValues } from 'react-hook-form';

export const isFilterValueActive = (value: unknown, defaultValue: unknown): boolean => {
  if (Array.isArray(value) && Array.isArray(defaultValue)) {
    return (
      value.length !== defaultValue.length ||
      value.some((item, index) => item !== defaultValue[index])
    );
  }
  if (typeof value === 'string' && typeof defaultValue === 'string') {
    return value.trim() !== defaultValue.trim();
  }
  return value !== defaultValue;
};

export const countActiveFilters = (
  values: FieldValues,
  defaultValues: FieldValues,
  fields: readonly string[],
) => fields.filter((field) => isFilterValueActive(values[field], defaultValues[field])).length;

export const hasActiveFilters = (values: FieldValues, defaultValues: FieldValues) =>
  countActiveFilters(values, defaultValues, Object.keys(defaultValues)) > 0;
