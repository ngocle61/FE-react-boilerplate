import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatches } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui';

import { toBreadcrumbEntries } from '../../utils/breadcrumb.util';

export const AppBreadcrumb = () => {
  const { t } = useTranslation();

  const entries = toBreadcrumbEntries(useMatches());

  if (entries.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {entries.map((entry, index) => (
          <Fragment key={entry.id}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === entries.length - 1 ? (
                <BreadcrumbPage>{t(entry.labelKey)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={entry.pathname}>{t(entry.labelKey)}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
