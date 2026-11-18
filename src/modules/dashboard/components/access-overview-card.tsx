import { ArrowRightIcon, LockIcon, ShieldCheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { I18N_NAMESPACES } from '@/core/constants/language.constant';
import { useAccess } from '@/core/hooks/use-access';
import { NAVIGATION_GROUPS } from '@/shared/constants/navigation.constant';
import {
  Badge,
  BADGE_VARIANTS,
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Flex,
  FLEX_ALIGNMENTS,
  FLEX_DIRECTIONS,
  ICON_PLACEMENTS,
} from '@ui';

export const AccessOverviewCard = () => {
  const { t } = useTranslation([I18N_NAMESPACES.DASHBOARD, I18N_NAMESPACES.COMMON]);
  const { can } = useAccess();

  const items = NAVIGATION_GROUPS.flatMap((group) => group.items);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('access.title')}</CardTitle>
        <CardDescription>{t('access.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Flex asChild direction={FLEX_DIRECTIONS.COL} className="divide-y">
          <ul>
            {items.map(({ key, labelKey, href, icon: Icon, access }) => {
              const isGranted = can(access);

              return (
                <Flex
                  key={key}
                  asChild
                  align={FLEX_ALIGNMENTS.CENTER}
                  gap={3}
                  className="py-2 first:pt-0 last:pb-0"
                >
                  <li>
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm font-medium">
                      {t(labelKey, { ns: I18N_NAMESPACES.COMMON })}
                    </span>
                    <Badge variant={isGranted ? BADGE_VARIANTS.SECONDARY : BADGE_VARIANTS.OUTLINE}>
                      {isGranted ? (
                        <ShieldCheckIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
                      ) : (
                        <LockIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
                      )}
                      {t(isGranted ? 'access.granted' : 'access.denied')}
                    </Badge>
                    <Button asChild variant={BUTTON_VARIANTS.GHOST} size={BUTTON_SIZES.SM}>
                      <Link to={href}>
                        {t('access.open')}
                        <ArrowRightIcon data-icon={ICON_PLACEMENTS.INLINE_END} />
                      </Link>
                    </Button>
                  </li>
                </Flex>
              );
            })}
          </ul>
        </Flex>
      </CardContent>
    </Card>
  );
};
