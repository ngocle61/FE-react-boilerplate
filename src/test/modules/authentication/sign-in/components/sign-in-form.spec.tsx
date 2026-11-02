import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { i18nReady } from '@/core/libs/i18n';
import { HttpError } from '@/core/utils/http-error.util';
import { SignInForm } from '@/modules/authentication/sign-in/components/sign-in-form';

const signIn = vi.fn();

vi.mock('@/modules/authentication/hooks/use-sign-in', () => ({
  useSignIn: () => ({ mutate: signIn, isPending: false }),
}));

describe('SignInForm', () => {
  beforeAll(async () => {
    await i18nReady;
  });

  beforeEach(() => {
    signIn.mockReset();
  });

  it('does not validate a field the user leaves before the first submit', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(screen.getByLabelText('Password'));
    await user.tab();

    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  it('shows every error on submit, then revalidates as the user types', async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(signIn).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText('Password'), 'secret');

    await waitFor(() => expect(screen.queryByText('Password is required')).not.toBeInTheDocument());
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows the field errors the server returns for the submitted values', async () => {
    signIn.mockImplementation((_values: unknown, options: { onError: (error: unknown) => void }) =>
      options.onError(
        new HttpError({
          messageKey: 'validationFailed',
          fieldErrors: { email: [{ key: 'emailAlreadyInUse' }] },
        }),
      ),
    );
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(screen.getByLabelText('Email'), 'ann@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('This email is already in use.')).toBeInTheDocument();
    expect(signIn).toHaveBeenCalledWith(
      { email: 'ann@example.com', password: 'secret' },
      expect.any(Object),
    );
  });
});
