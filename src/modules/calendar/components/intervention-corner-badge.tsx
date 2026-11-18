import { StarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';

export const InterventionCornerBadge = () => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <span className="pointer-events-none absolute top-0 left-0 z-10 size-7 bg-urgent [clip-path:polygon(0_0,100%_0,0_100%)]">
      <StarIcon
        aria-hidden
        className="absolute top-0.75 left-0.75 size-3 fill-urgent-foreground text-urgent-foreground"
      />
      <span className="sr-only">{t('card.urgent')}</span>
    </span>
  );
};
