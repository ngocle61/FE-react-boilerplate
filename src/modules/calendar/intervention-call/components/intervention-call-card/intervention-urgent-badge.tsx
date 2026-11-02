import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Badge, BADGE_VARIANTS } from '@ui';

export const InterventionUrgentBadge = () => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <Badge variant={BADGE_VARIANTS.OUTLINE} className="shrink-0">
      <StarIcon aria-hidden className="fill-urgent text-urgent" />
      {t('card.urgent')}
    </Badge>
  );
};
