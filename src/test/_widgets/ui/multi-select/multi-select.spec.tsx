import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MultiSelect } from '@ui';

const OPTIONS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

describe('MultiSelect', () => {
  it('removes a selected item without opening the option list', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        options={OPTIONS}
        value={['scheduled', 'completed']}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Remove Scheduled' }));

    const trigger = screen.getByRole('button', { name: 'Scheduled, Completed' });
    expect(onValueChange).toHaveBeenCalledWith(['completed']);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('clears every selected item at once', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        options={OPTIONS}
        value={['scheduled', 'completed', 'cancelled']}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    const trigger = screen.getByRole('button', { name: 'Scheduled, Completed, Cancelled' });
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('shows no clear button when nothing is selected', () => {
    render(<MultiSelect options={OPTIONS} value={[]} onValueChange={vi.fn()} />);

    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
  });

  it('opens the option list from the trigger', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={OPTIONS} value={['scheduled']} onValueChange={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Scheduled' }));

    expect(screen.getByRole('button', { name: 'Scheduled' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('hides the remove and clear buttons when disabled', () => {
    render(
      <MultiSelect options={OPTIONS} value={['scheduled']} onValueChange={vi.fn()} disabled />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});
