import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Badge } from '@ui';

import { INTERVENTION_STATUS_BADGE_VARIANT } from '../constants/intervention-status.constant';
import type { InterventionStatusBadgeProps } from '../types/intervention-status-badge.type';

export const InterventionStatusBadge = ({ status, className }: InterventionStatusBadgeProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <Badge variant={INTERVENTION_STATUS_BADGE_VARIANT[status]} className={className}>
      {t(`status.${status}`)}
    </Badge>
  );
};
