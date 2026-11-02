import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Combobox } from '@ui';

const OPTIONS = [
  { value: 'acme', label: 'Acme' },
  { value: 'globex', label: 'Globex' },
];

const LABEL = 'Client';

describe('Combobox', () => {
  it('filters its options and selects one', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={OPTIONS}
        value={undefined}
        onValueChange={onValueChange}
        placeholder="Pick a client"
        aria-label={LABEL}
      />,
    );

    const trigger = screen.getByRole('button', { name: LABEL });
    expect(trigger).toHaveTextContent('Pick a client');

    await user.click(trigger);
    await user.type(screen.getByRole('combobox'), 'glo');

    expect(screen.queryByRole('option', { name: 'Acme' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Globex' }));

    expect(onValueChange).toHaveBeenCalledWith('globex');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('leaves filtering to the caller when it searches on the server', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <Combobox
        options={OPTIONS}
        value={undefined}
        onValueChange={vi.fn()}
        onSearchChange={onSearchChange}
        aria-label={LABEL}
      />,
    );

    await user.click(screen.getByRole('button', { name: LABEL }));
    await user.type(screen.getByRole('combobox'), '0901');

    expect(onSearchChange).toHaveBeenLastCalledWith('0901');
    expect(screen.getAllByRole('option')).toHaveLength(OPTIONS.length);

    await user.keyboard('{Escape}');

    expect(onSearchChange).toHaveBeenLastCalledWith('');
  });

  it('keeps the selected label after the server results change', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Combobox
        options={OPTIONS}
        value={undefined}
        onValueChange={vi.fn()}
        onSearchChange={vi.fn()}
        aria-label={LABEL}
      />,
    );

    await user.click(screen.getByRole('button', { name: LABEL }));
    await user.click(screen.getByRole('option', { name: 'Globex' }));
    rerender(
      <Combobox
        options={[]}
        value="globex"
        onValueChange={vi.fn()}
        onSearchChange={vi.fn()}
        aria-label={LABEL}
      />,
    );

    expect(screen.getByRole('button', { name: LABEL })).toHaveTextContent('Globex');
  });
});
