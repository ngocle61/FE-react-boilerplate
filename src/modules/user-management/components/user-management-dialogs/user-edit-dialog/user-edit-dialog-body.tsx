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
import { Form, InputField, SelectField, SwitchField } from '@ui/form';

import { USER_ROLES } from '../../../constants/role.constant';
import { userConverter } from '../../../converters/user.converter';
import { useUpdateUser } from '../../../hooks/use-update-user';
import { editUserFormSchema } from '../../../schema/edit-user-form.schema';
import type { UserEditDialogBodyProps } from '../../../types/user-edit-dialog-body.type';
import type { EditUserFormValues } from '../../../types/user-form.type';

export const UserEditDialogBody = ({ user, onOpenChange }: UserEditDialogBodyProps) => {
  const { t } = useTranslation([I18N_NAMESPACES.USER_MANAGEMENT, I18N_NAMESPACES.COMMON]);
  const formId = useId();

  const schema = editUserFormSchema(t);

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: userConverter.toEditFormValues(user),
    ...SUBMIT_FIRST_VALIDATION,
  });
  const updateUser = useUpdateUser();

  const roleOptions = USER_ROLES.map((role) => ({ value: role, label: t(`common:roles.${role}`) }));

  const submit = (values: EditUserFormValues) => {
    updateUser.mutate(
      { id: user.id, payload: values },
      {
        onSuccess: () => {
          toast.success(t('form.updateSuccess'));
          onOpenChange(false);
        },
        onError: (error) => applyServerFieldErrors(error, form.setError),
      },
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('form.editTitle')}</DialogTitle>
        <DialogDescription>{t('form.editDescription')}</DialogDescription>
      </DialogHeader>
      <Form id={formId} form={form} onSubmit={submit}>
        <FieldGroup>
          <InputField name="fullName" label={t('form.fullNameLabel')} />
          <SelectField name="role" label={t('form.roleLabel')} options={roleOptions} />
          <SwitchField name="isActive" label={t('form.statusLabel')} />
        </FieldGroup>
      </Form>
      <DialogFooter>
        <Button
          type="button"
          variant={BUTTON_VARIANTS.OUTLINE}
          onClick={() => onOpenChange(false)}
          disabled={updateUser.isPending}
        >
          {t('common:actions.cancel')}
        </Button>
        <Button type="submit" form={formId} disabled={updateUser.isPending}>
          {updateUser.isPending && <Spinner data-icon={ICON_PLACEMENTS.INLINE_START} />}
          {t('form.saveChanges')}
        </Button>
      </DialogFooter>
    </>
  );
};
