import { useTranslation } from 'react-i18next';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { Flex } from '@ui';

import type { DropSlotPreviewProps } from '../types/drop-slot-preview.type';
import { formatClockTime } from '../utils/format-date.util';
import { CARD_HEIGHT_PX, getCardTop } from '../utils/time-grid.util';

export const DropSlotPreview = ({ startsAt, endsAt }: DropSlotPreviewProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-1 z-10 rounded-md border-2 border-dashed border-primary bg-primary/15 p-1 shadow-card"
      style={{ top: getCardTop(startsAt), height: CARD_HEIGHT_PX }}
    >
      <Flex
        asChild
        className="inline-flex rounded-sm bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground tabular-nums"
      >
        <span>
          {t('card.timeRange', {
            start: formatClockTime(startsAt, i18n.language),
            end: formatClockTime(endsAt, i18n.language),
          })}
        </span>
      </Flex>
    </div>
  );
};
