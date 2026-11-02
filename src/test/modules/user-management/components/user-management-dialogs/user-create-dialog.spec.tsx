import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { ROLES } from '@/core/constants/roles.constant';
import { i18nReady } from '@/core/libs/i18n';
import type { CreateUserPayload } from '@/core/types/user.dto';
import { HttpError } from '@/core/utils/http-error.util';
import { UserCreateDialog } from '@/modules/user-management/components/user-management-dialogs/user-create-dialog/user-create-dialog';

const { create, toastSuccess } = vi.hoisted(() => ({
  create: vi.fn<(payload: CreateUserPayload) => Promise<void>>(),
  toastSuccess: vi.fn(),
}));

vi.mock('@/modules/user-management/services/user-management.service', () => ({
  userManagementService: { create },
}));
vi.mock('sonner', () => ({ toast: { success: toastSuccess, error: vi.fn() } }));

const renderDialog = () => {
  const onOpenChange = vi.fn();
  render(
    <QueryClientProvider client={new QueryClient()}>
      <UserCreateDialog open onOpenChange={onOpenChange} />
    </QueryClientProvider>,
  );
  return { onOpenChange };
};

const ReopenableCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <UserCreateDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

const fillAndSubmit = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Email'), 'ann@example.com');
  await user.type(screen.getByLabelText('Full name'), 'Ann Lee');
  await user.type(screen.getByLabelText('Password'), 'Password@123');
  await user.click(screen.getByRole('button', { name: 'Create user' }));
};

beforeAll(() => i18nReady);

describe('UserCreateDialog', () => {
  beforeEach(() => {
    create.mockReset();
    toastSuccess.mockReset();
  });

  it('creates the user, confirms it, and closes', async () => {
    create.mockResolvedValue();
    const { onOpenChange } = renderDialog();

    await fillAndSubmit();

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
    expect(create).toHaveBeenCalledWith(
      {
        email: 'ann@example.com',
        fullName: 'Ann Lee',
        password: 'Password@123',
        role: ROLES.VIEWER,
      },
      expect.anything(),
    );
    expect(toastSuccess).toHaveBeenCalledWith('User created successfully.');
  });

  it('shows the field errors the server returns and stays open', async () => {
    create.mockRejectedValue(
      new HttpError({
        messageKey: 'validationFailed',
        fieldErrors: { email: [{ key: 'emailAlreadyInUse' }] },
      }),
    );
    const { onOpenChange } = renderDialog();

    await fillAndSubmit();

    expect(await screen.findByText('This email is already in use.')).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it('starts from an empty form every time it is opened again', async () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ReopenableCreateDialog />
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.type(await screen.findByLabelText('Email'), 'ann@example.com');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByLabelText('Email')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });
});
