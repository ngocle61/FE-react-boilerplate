import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { FilterBar } from '@/shared/components/filter-bar/filter-bar';
import { FilterBarFilters } from '@/shared/components/filter-bar/filter-bar-filters';
import { FilterBarSearch } from '@/shared/components/filter-bar/filter-bar-search';
import { InputField } from '@ui/form';

const DEFAULT_VALUES = { search: '', north: '', south: '', east: '', west: '' };

type HarnessField = Exclude<keyof typeof DEFAULT_VALUES, 'search'>;

const THREE_FIELDS: readonly HarnessField[] = ['north', 'south', 'east'];
const FOUR_FIELDS: readonly HarnessField[] = ['north', 'south', 'east', 'west'];

const setMobileViewport = () => {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches: true,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList,
  );
};

const Harness = ({ fields }: { fields: readonly HarnessField[] }) => {
  const form = useForm({ defaultValues: DEFAULT_VALUES });

  return (
    <FilterBar form={form} defaultValues={DEFAULT_VALUES}>
      <FilterBarSearch>
        <InputField name="search" label="search" />
      </FilterBarSearch>
      <FilterBarFilters fields={fields}>
        {fields.map((field) => (
          <InputField key={field} name={field} label={field} />
        ))}
      </FilterBarFilters>
    </FilterBar>
  );
};

describe('FilterBar', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  it('keeps every filter inline on desktop', () => {
    render(<Harness fields={FOUR_FIELDS} />);

    expect(screen.getByRole('textbox', { name: 'west' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Filters/ })).not.toBeInTheDocument();
  });

  it('keeps up to three filters inline on mobile', () => {
    setMobileViewport();
    render(<Harness fields={THREE_FIELDS} />);

    expect(screen.getByRole('textbox', { name: 'east' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Filters/ })).not.toBeInTheDocument();
  });

  it('collapses more than three filters into a dialog on mobile, keeping search inline', () => {
    setMobileViewport();
    render(<Harness fields={FOUR_FIELDS} />);

    expect(screen.getByRole('textbox', { name: 'search' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'north' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Filters/ })).toBeInTheDocument();
  });

  it('discards dialog changes on cancel and commits them on apply', async () => {
    const user = userEvent.setup();
    setMobileViewport();
    render(<Harness fields={FOUR_FIELDS} />);
    const trigger = screen.getByRole('button', { name: /^Filters/ });

    await user.click(trigger);
    await user.type(screen.getByRole('textbox', { name: 'north' }), 'draft');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent(/^Filters$/);

    await user.click(trigger);
    const north = screen.getByRole('textbox', { name: 'north' });
    expect(north).toHaveValue('');

    await user.type(north, 'kept');
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent(/^Filters1$/);
  });

  it('shows clear all only when a filter is active and resets every field', async () => {
    const user = userEvent.setup();
    render(<Harness fields={THREE_FIELDS} />);

    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();

    const search = screen.getByRole('textbox', { name: 'search' });
    const south = screen.getByRole('textbox', { name: 'south' });
    await user.type(search, 'boiler');
    await user.type(south, 'x');
    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(search).toHaveValue('');
    expect(south).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  });

  it('ignores whitespace-only search when deciding whether to show clear all', async () => {
    const user = userEvent.setup();
    render(<Harness fields={THREE_FIELDS} />);

    await user.type(screen.getByRole('textbox', { name: 'search' }), '   ');

    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  });
});
