import { CalendarClockIcon, CopyIcon, MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import {
  Button,
  BUTTON_VARIANTS,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_DIRECTIONS,
  FLEX_JUSTIFICATIONS,
  ICON_PLACEMENTS,
} from '@ui';

import { InterventionUrgentBadge } from './intervention-urgent-badge';
import { InterventionStatusBadge } from '../../../components/intervention-status-badge';
import { CALENDAR_VIEW_MODES } from '../../../constants/calendar-view.constant';
import type { InterventionCallCardProps } from '../../../types/intervention-call-card.type';
import { formatCalendarLabel, toTimeRangeParts } from '../../../utils/format-date.util';
import { toTelHref } from '../../../utils/phone.util';

export const InterventionCallCard = ({ row }: InterventionCallCardProps) => {
  const { t, i18n } = useTranslation(I18N_NAMESPACES.CALENDAR);

  const phone = row.clientPhone ?? '';
  const telHref = toTelHref(phone);

  const timeRangeParts = toTimeRangeParts(row, i18n.language);
  const dayLabel =
    row.startsAt && formatCalendarLabel(row.startsAt, CALENDAR_VIEW_MODES.DAY, i18n.language);
  const schedule =
    dayLabel && timeRangeParts
      ? `${dayLabel} · ${t('card.timeRange', { ...timeRangeParts })}`
      : t('call.unscheduled');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      toast.success(t('call.copied'));
    } catch {
      toast.error(t('call.copyError'));
    }
  };

  return (
    <Card className="@container mx-auto w-full max-w-xl">
      <CardHeader>
        <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2} wrap>
          <CardTitle>{row.clientName}</CardTitle>
          {row.isUrgent && <InterventionUrgentBadge />}
        </Flex>
        <CardDescription>{row.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <Flex direction={FLEX_DIRECTIONS.COL} gap={6}>
          <Flex
            direction={FLEX_DIRECTIONS.COL}
            align={FLEX_ALIGNMENTS.CENTER}
            gap={4}
            className="rounded-lg border border-border bg-muted/40 p-6 text-center"
          >
            <a
              href={telHref}
              className="text-3xl font-semibold tracking-tight text-foreground tabular-nums hover:underline"
            >
              {phone}
            </a>
            <Flex justify={FLEX_JUSTIFICATIONS.CENTER} gap={2} wrap>
              <Button asChild>
                <a href={telHref}>
                  <PhoneIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
                  {t('call.action')}
                </a>
              </Button>
              <Button variant={BUTTON_VARIANTS.OUTLINE} onClick={handleCopy}>
                <CopyIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
                {t('call.copy')}
              </Button>
            </Flex>
          </Flex>
          <Flex direction={FLEX_DIRECTIONS.COL} gap={3} className="text-sm text-muted-foreground">
            <div>
              <InterventionStatusBadge status={row.status} />
            </div>
            <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
              <CalendarClockIcon className="size-4 shrink-0" aria-hidden />
              <span>{schedule}</span>
            </Flex>
            {row.clientAddress && (
              <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
                <MapPinIcon className="size-4 shrink-0" aria-hidden />
                <span>{row.clientAddress}</span>
              </Flex>
            )}
            <Flex align={FLEX_ALIGNMENTS.CENTER} gap={2}>
              <UserIcon className="size-4 shrink-0" aria-hidden />
              <span>{row.technicianName ?? t('form.unassigned')}</span>
            </Flex>
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};
