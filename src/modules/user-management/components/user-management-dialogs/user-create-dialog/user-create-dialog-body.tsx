import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { applyServerFieldErrors } from '@/core/utils/form-error.util';
import { SUBMIT_FIRST_VALIDATION } from '@/shared/constants/form.constant';
import {
  Button,
  BUTTON_VARIANTS,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  ICON_PLACEMENTS,
  Spinner,
} from '@ui';
import { Form, InputField, PasswordField, SelectField } from '@ui/form';

import { USER_ROLES } from '../../../constants/role.constant';
import { CREATE_USER_DEFAULT_VALUES } from '../../../constants/user-form.constant';
import { useCreateUser } from '../../../hooks/use-create-user';
import { createUserFormSchema } from '../../../schema/create-user-form.schema';
import type { UserCreateDialogBodyProps } from '../../../types/user-create-dialog-body.type';
import type { CreateUserFormValues } from '../../../types/user-form.type';

export const UserCreateDialogBody = ({ onOpenChange }: UserCreateDialogBodyProps) => {
  const { t } = useTranslation([I18N_NAMESPACES.USER_MANAGEMENT, I18N_NAMESPACES.COMMON]);
  const formId = useId();

  const schema = createUserFormSchema(t);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: CREATE_USER_DEFAULT_VALUES,
    ...SUBMIT_FIRST_VALIDATION,
  });
  const createUser = useCreateUser();

  const roleOptions = USER_ROLES.map((role) => ({ value: role, label: t(`common:roles.${role}`) }));

  const submit = (values: CreateUserFormValues) => {
    createUser.mutate(values, {
      onSuccess: () => {
        toast.success(t('form.createSuccess'));
        onOpenChange(false);
      },
      onError: (error) => applyServerFieldErrors(error, form.setError),
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('form.createTitle')}</DialogTitle>
        <DialogDescription>{t('form.createDescription')}</DialogDescription>
      </DialogHeader>
      <Form id={formId} form={form} onSubmit={submit}>
        <FieldGroup>
          <InputField name="email" type="email" label={t('form.emailLabel')} />
          <InputField name="fullName" label={t('form.fullNameLabel')} />
          <PasswordField
            name="password"
            label={t('form.passwordLabel')}
            showPasswordLabel={t('form.showPassword')}
            hidePasswordLabel={t('form.hidePassword')}
          />
          <SelectField name="role" label={t('form.roleLabel')} options={roleOptions} />
        </FieldGroup>
      </Form>
      <DialogFooter>
        <Button
          type="button"
          variant={BUTTON_VARIANTS.OUTLINE}
          onClick={() => onOpenChange(false)}
          disabled={createUser.isPending}
        >
          {t('common:actions.cancel')}
        </Button>
        <Button type="submit" form={formId} disabled={createUser.isPending}>
          {createUser.isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
          {t('form.create')}
        </Button>
      </DialogFooter>
    </>
  );
};
