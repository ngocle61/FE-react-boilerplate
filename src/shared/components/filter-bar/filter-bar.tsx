import type { FieldValues } from 'react-hook-form';

import { Flex, FLEX_ALIGNMENTS, FLEX_JUSTIFICATIONS } from '@ui';
import { Form } from '@ui/form';

import { FilterBarContext } from './filter-bar-context';
import type { FilterBarProps } from './filter-bar.type';

export const FilterBar = <TValues extends FieldValues>({
  form,
  defaultValues,
  children,
}: FilterBarProps<TValues>) => {
  const contextValue = {
    state: { defaultValues },
    actions: { clearAll: () => form.reset(defaultValues) },
  };

  return (
    <FilterBarContext value={contextValue}>
      <Form form={form}>
        <Flex align={FLEX_ALIGNMENTS.CENTER} justify={FLEX_JUSTIFICATIONS.BETWEEN} gap={2} wrap>
          {children}
        </Flex>
      </Form>
    </FilterBarContext>
  );
};
