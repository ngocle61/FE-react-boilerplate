import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  cn,
  ICON_PLACEMENTS,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@ui';

import type { PaginatedTablePagesProps } from './paginated-table-pages.type';
import { PAGE_ELLIPSIS } from '../../constants/pagination.constant';
import { buildPageItems } from '../../utils/pagination.util';

export const PaginatedTablePages = ({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginatedTablePagesProps) => {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const items = buildPageItems(page, totalPages);

  return (
    <Pagination aria-label={t('pagination.navigation')} className={cn('justify-end', className)}>
      <PaginationContent>
        <PaginationItem>
          <Button
            type="button"
            variant={BUTTON_VARIANTS.GHOST}
            size={BUTTON_SIZES.SM}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label={t('pagination.previousPage')}
          >
            <ChevronLeftIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
            <span className="hidden sm:block">{t('pagination.previous')}</span>
          </Button>
        </PaginationItem>
        {items.map((item, index) =>
          item === PAGE_ELLIPSIS ? (
            <PaginationItem key={`${PAGE_ELLIPSIS}-${index}`}>
              <PaginationEllipsis label={t('pagination.more')} />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <Button
                type="button"
                variant={item === page ? BUTTON_VARIANTS.OUTLINE : BUTTON_VARIANTS.GHOST}
                size={BUTTON_SIZES.ICON_SM}
                aria-current={item === page ? 'page' : undefined}
                aria-label={t('pagination.page', { page: item })}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <Button
            type="button"
            variant={BUTTON_VARIANTS.GHOST}
            size={BUTTON_SIZES.SM}
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label={t('pagination.nextPage')}
          >
            <span className="hidden sm:block">{t('pagination.next')}</span>
            <ChevronRightIcon data-icon={ICON_PLACEMENTS.INLINE_END} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
