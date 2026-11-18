import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { ROLES } from '@/core/constants/roles.constant';
import { i18nReady } from '@/core/libs/i18n';
import type { UpdateUserPayload } from '@/core/types/user.dto';
import { HttpError } from '@/core/utils/http-error.util';
import { UserEditDialog } from '@/modules/user-management/components/user-management-dialogs/user-edit-dialog/user-edit-dialog';
import type { UserRow } from '@/modules/user-management/types/user-row.type';

const { update, toastSuccess } = vi.hoisted(() => ({
  update: vi.fn<(id: string, payload: UpdateUserPayload) => Promise<void>>(),
  toastSuccess: vi.fn(),
}));

vi.mock('@/modules/user-management/services/user-management.service', () => ({
  userManagementService: { update },
}));
vi.mock('sonner', () => ({ toast: { success: toastSuccess, error: vi.fn() } }));

const USER = {
  id: 'user-ann',
  fullName: 'Ann Lee',
  role: ROLES.MEMBER,
  isActive: true,
} as UserRow;

const renderDialog = () => {
  const onOpenChange = vi.fn();
  render(
    <QueryClientProvider client={new QueryClient()}>
      <UserEditDialog user={USER} open onOpenChange={onOpenChange} />
    </QueryClientProvider>,
  );
  return { onOpenChange };
};

const renameAndSave = async () => {
  const user = userEvent.setup();
  const fullName = screen.getByLabelText('Full name');
  await user.clear(fullName);
  await user.type(fullName, 'Ann Smith');
  await user.click(screen.getByRole('button', { name: 'Save changes' }));
};

beforeAll(() => i18nReady);

describe('UserEditDialog', () => {
  beforeEach(() => {
    update.mockReset();
    toastSuccess.mockReset();
  });

  it('starts from the selected user', () => {
    renderDialog();

    expect(screen.getByLabelText('Full name')).toHaveValue('Ann Lee');
    expect(screen.getByRole('switch', { name: 'Active' })).toBeChecked();
  });

  it('saves the changes, confirms them, and closes', async () => {
    update.mockResolvedValue();
    const { onOpenChange } = renderDialog();

    await renameAndSave();

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
    expect(update).toHaveBeenCalledWith('user-ann', {
      fullName: 'Ann Smith',
      role: ROLES.MEMBER,
      isActive: true,
    });
    expect(toastSuccess).toHaveBeenCalledWith('User updated successfully.');
  });

  it('shows the field errors the server returns and stays open', async () => {
    update.mockRejectedValue(
      new HttpError({
        messageKey: 'validationFailed',
        fieldErrors: { fullName: [{ key: 'fieldTooLong', params: { maximum: 5 } }] },
      }),
    );
    const { onOpenChange } = renderDialog();

    await renameAndSave();

    expect(await screen.findByText('Enter at most 5 characters.')).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
