import { PhoneIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';

import type { InterventionCallLinkProps } from '../types/intervention-card.type';
import { buildInterventionCallPath } from '../utils/intervention-route.util';

export const InterventionCallLink = ({ interventionId }: InterventionCallLinkProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <a
      href={buildInterventionCallPath(interventionId)}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className="rounded text-muted-foreground hover:text-foreground"
      aria-label={t('card.callClient')}
    >
      <PhoneIcon className="size-3.5" />
    </a>
  );
};
