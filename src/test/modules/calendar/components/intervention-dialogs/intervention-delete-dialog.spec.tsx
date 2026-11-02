import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { HttpError } from '@/core/utils/http-error.util';
import { InterventionDeleteDialog } from '@/modules/calendar/components/intervention-dialogs/intervention-delete-dialog';
import type { InterventionRow } from '@/modules/calendar/types/intervention-row.type';

const { remove, toastSuccess } = vi.hoisted(() => ({
  remove: vi.fn<(id: string) => Promise<void>>(),
  toastSuccess: vi.fn(),
}));

vi.mock('@/modules/calendar/services/intervention.service', () => ({
  interventionService: { remove },
}));
vi.mock('sonner', () => ({ toast: { success: toastSuccess, error: vi.fn() } }));

const INTERVENTION = { id: 'intervention-1', clientName: 'Acme' } as InterventionRow;

const renderDialog = () => {
  const onOpenChange = vi.fn();
  const onDeleted = vi.fn();
  render(
    <QueryClientProvider client={new QueryClient()}>
      <InterventionDeleteDialog
        intervention={INTERVENTION}
        open
        onOpenChange={onOpenChange}
        onDeleted={onDeleted}
      />
    </QueryClientProvider>,
  );
  return { onOpenChange, onDeleted };
};

beforeAll(() => i18nReady);

describe('InterventionDeleteDialog', () => {
  beforeEach(() => {
    remove.mockReset();
    toastSuccess.mockReset();
  });

  it('stays open with the action disabled until the delete finishes', async () => {
    let resolve: () => void = () => undefined;
    remove.mockReturnValue(
      new Promise<void>((settle) => {
        resolve = settle;
      }),
    );
    const user = userEvent.setup();
    const { onOpenChange, onDeleted } = renderDialog();

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(await screen.findByRole('button', { name: /Delete/ })).toBeDisabled();
    expect(onOpenChange).not.toHaveBeenCalled();

    resolve();

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
    expect(onDeleted).toHaveBeenCalledTimes(1);
    expect(toastSuccess).toHaveBeenCalledWith('Intervention deleted.');
  });

  it('stays open when the delete fails so the user can retry', async () => {
    remove.mockRejectedValue(new HttpError({ messageKey: 'internal' }));
    const user = userEvent.setup();
    const { onOpenChange, onDeleted } = renderDialog();

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled());
    expect(remove).toHaveBeenCalledWith('intervention-1', expect.anything());
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(onDeleted).not.toHaveBeenCalled();
  });
});
