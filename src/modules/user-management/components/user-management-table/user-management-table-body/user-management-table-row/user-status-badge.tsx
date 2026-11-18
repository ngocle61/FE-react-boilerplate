import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Badge } from '@ui';

import {
  USER_ACTIVE_BADGE_VARIANT,
  USER_INACTIVE_BADGE_VARIANT,
} from '../../../../constants/user-status.constant';
import type { UserStatusBadgeProps } from '../../../../types/user-status-badge.type';

export const UserStatusBadge = ({ isActive }: UserStatusBadgeProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.USER_MANAGEMENT);

  return (
    <Badge variant={isActive ? USER_ACTIVE_BADGE_VARIANT : USER_INACTIVE_BADGE_VARIANT}>
      {isActive ? t('status.active') : t('status.inactive')}
    </Badge>
  );
};
