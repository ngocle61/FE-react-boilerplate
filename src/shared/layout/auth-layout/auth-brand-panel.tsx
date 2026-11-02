import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ENV } from '@/core/constants/env.constant';
import { ROUTE_PATHS } from '@/core/constants/route-paths.constant';
import { AppLogo } from '@/shared/components/app-logo/app-logo';
import { AUTH_BRAND_FEATURES } from '@/shared/constants/auth-brand.constant';
import { Flex, FLEX_ALIGNMENTS, FLEX_DIRECTIONS, FLEX_JUSTIFICATIONS } from '@ui';

export const AuthBrandPanel = () => {
  const { t } = useTranslation();

  return (
    <Flex
      asChild
      direction={FLEX_DIRECTIONS.COL}
      justify={FLEX_JUSTIFICATIONS.CENTER}
      gap={6}
      className="relative isolate overflow-hidden bg-brand px-6 py-8 text-brand-foreground sm:px-10 md:gap-8 md:px-12 md:py-12"
    >
      <aside>
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 -z-10 size-80 rounded-full bg-primary/40 blur-3xl"
        />
        <Flex
          asChild
          align={FLEX_ALIGNMENTS.CENTER}
          gap={3}
          className="w-fit rounded-lg text-2xl font-bold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-brand-foreground/50"
        >
          <Link to={ROUTE_PATHS.ROOT}>
            <AppLogo className="size-11 rounded-xl" />
            {ENV.APP_NAME}
          </Link>
        </Flex>
        <p className="hidden text-md text-brand-foreground/80 md:block">{t('authBrand.tagline')}</p>
        <Flex asChild direction={FLEX_DIRECTIONS.COL} gap={4} className="hidden md:flex">
          <ul aria-label={t('authBrand.featuresLabel')}>
            {AUTH_BRAND_FEATURES.map(({ key, labelKey }) => (
              <Flex
                key={key}
                asChild
                align={FLEX_ALIGNMENTS.CENTER}
                gap={3}
                className="text-sm font-semibold"
              >
                <li>
                  <Flex
                    asChild
                    align={FLEX_ALIGNMENTS.CENTER}
                    justify={FLEX_JUSTIFICATIONS.CENTER}
                    className="size-6 shrink-0 rounded-full bg-brand-foreground/15"
                  >
                    <span aria-hidden>
                      <CheckIcon className="size-3.5" />
                    </span>
                  </Flex>
                  {t(labelKey)}
                </li>
              </Flex>
            ))}
          </ul>
        </Flex>
      </aside>
    </Flex>
  );
};
