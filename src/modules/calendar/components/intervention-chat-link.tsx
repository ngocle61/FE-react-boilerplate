import { MessageCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';

import type { InterventionChatLinkProps } from '../types/intervention-card.type';
import { buildInterventionChatPath } from '../utils/intervention-route.util';

export const InterventionChatLink = ({ row }: InterventionChatLinkProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <Link
      to={buildInterventionChatPath(row)}
      draggable={false}
      className="rounded text-muted-foreground hover:text-foreground"
      aria-label={t('card.openChat')}
    >
      <MessageCircleIcon className="size-3.5" />
    </Link>
  );
};
