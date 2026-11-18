import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { applyServerFieldErrors } from '@/core/utils/form-error.util';
import { SUBMIT_FIRST_VALIDATION } from '@/shared/constants/form.constant';
import { Button, BUTTON_SIZES, FieldGroup, ICON_PLACEMENTS, Spinner } from '@ui';
import { Form, InputField, PasswordField } from '@ui/form';

import { SIGN_IN_DEFAULT_VALUES } from '../../constants/sign-in.constant';
import { useSignIn } from '../../hooks/use-sign-in';
import { createSignInSchema } from '../../schema/sign-in.schema';
import type { SignInFormValues } from '../../types/sign-in.type';

export const SignInForm = () => {
  const { t } = useTranslation(I18N_NAMESPACES.AUTHENTICATION);

  const schema = createSignInSchema(t);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: SIGN_IN_DEFAULT_VALUES,
    ...SUBMIT_FIRST_VALIDATION,
  });
  const { mutate: signIn, isPending } = useSignIn();

  const submit = (values: SignInFormValues) =>
    signIn(values, { onError: (error) => applyServerFieldErrors(error, form.setError) });

  return (
    <Form form={form} onSubmit={submit}>
      <FieldGroup className="gap-6">
        <InputField
          name="email"
          type="email"
          autoComplete="email"
          label={t('signIn.emailLabel')}
          placeholder={t('signIn.emailPlaceholder')}
        />
        <PasswordField
          name="password"
          autoComplete="current-password"
          label={t('signIn.passwordLabel')}
          placeholder={t('signIn.passwordPlaceholder')}
          showPasswordLabel={t('signIn.showPassword')}
          hidePasswordLabel={t('signIn.hidePassword')}
        />
        <Button type="submit" size={BUTTON_SIZES.LG} className="mt-2 w-full" disabled={isPending}>
          {isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
          {t('signIn.submit')}
        </Button>
      </FieldGroup>
    </Form>
  );
};
