import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Badge } from '@ui';

import { ROLE_BADGE_VARIANT } from '../../../../constants/role.constant';
import type { UserRoleBadgeProps } from '../../../../types/user-role-badge.type';

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.COMMON);

  return <Badge variant={ROLE_BADGE_VARIANT[role]}>{t(`roles.${role}`)}</Badge>;
};
