import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import {
  CheckboxField,
  DatePickerField,
  FIELD_LABEL_DISPLAYS,
  Form,
  PasswordField,
  PhoneInputField,
  RadioGroupField,
  SwitchField,
  TextareaField,
} from '@ui/form';

const REQUIRED_MESSAGE = 'Required';

const schema = z.object({
  phone: z.string().min(1, { error: REQUIRED_MESSAGE }),
  notes: z.string().min(1, { error: REQUIRED_MESSAGE }),
  password: z.string(),
  agree: z.boolean(),
  active: z.boolean(),
  size: z.string(),
  startsAt: z.date().optional(),
});

type HarnessValues = z.infer<typeof schema>;

const DEFAULT_VALUES: HarnessValues = {
  phone: '',
  notes: '',
  password: '',
  agree: false,
  active: false,
  size: '',
  startsAt: undefined,
};

const SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'large', label: 'Large' },
];

const Harness = ({ onSubmit }: { onSubmit: (values: HarnessValues) => void }) => {
  const form = useForm<HarnessValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <PhoneInputField name="phone" label="Phone" labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY} />
      <TextareaField name="notes" label="Notes" labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY} />
      <PasswordField name="password" label="Password" labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY} />
      <CheckboxField name="agree" label="Agree" labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY} />
      <SwitchField name="active" label="Active" labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY} />
      <RadioGroupField
        name="size"
        label="Size"
        options={SIZE_OPTIONS}
        labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
      />
      <DatePickerField
        name="startsAt"
        label="Starts at"
        labelDisplay={FIELD_LABEL_DISPLAYS.SR_ONLY}
      />
      <button type="submit">Save</button>
    </Form>
  );
};

describe('@ui/form fields', () => {
  it('hides every label visually while keeping it as the accessible name', () => {
    render(<Harness onSubmit={vi.fn()} />);

    const labels = ['Phone', 'Notes', 'Password', 'Agree', 'Active', 'Size', 'Starts at'];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toHaveClass('sr-only');
    });
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Agree' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Size' })).toBeInTheDocument();
  });

  it('focuses the first invalid field, the phone input included, and links the error', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    const phone = screen.getByLabelText('Phone');
    expect(phone).toHaveFocus();
    expect(phone).toHaveAttribute('aria-invalid', 'true');
    expect(phone).toHaveAccessibleDescription(REQUIRED_MESSAGE);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAccessibleDescription(
      REQUIRED_MESSAGE,
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
