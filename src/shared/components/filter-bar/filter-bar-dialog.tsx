import { SlidersHorizontalIcon } from 'lucide-react';
import { useId } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  BADGE_VARIANTS,
  Button,
  BUTTON_VARIANTS,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FieldGroup,
  ICON_PLACEMENTS,
} from '@ui';
import { Form } from '@ui/form';

import type { FilterBarFiltersProps } from './filter-bar.type';
import { useFilterBar } from './use-filter-bar';
import { useDisclosure } from '../../hooks/use-disclosure';
import { countActiveFilters } from '../../utils/filter-bar.util';

export const FilterBarDialog = ({ fields, children }: FilterBarFiltersProps) => {
  const { t } = useTranslation();
  const formId = useId();
  const { state } = useFilterBar();
  const form = useFormContext();
  const draft = useForm();
  const { isOpen, setIsOpen, close } = useDisclosure();
  const activeCount = useWatch({
    control: form.control,
    compute: (values) => countActiveFilters(values, state.defaultValues, fields),
  });

  const handleOpenChange = (open: boolean) => {
    if (open) draft.reset(form.getValues());
    setIsOpen(open);
  };

  const handleApply = () => {
    fields.forEach((field) => form.setValue(field, draft.getValues(field)));
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant={BUTTON_VARIANTS.OUTLINE}>
          <SlidersHorizontalIcon data-icon={ICON_PLACEMENTS.INLINE_START} />
          {t('filterBar.trigger')}
          {activeCount > 0 && (
            <Badge variant={BADGE_VARIANTS.SECONDARY} className="h-5 px-1.5">
              {activeCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('filterBar.dialogTitle')}</DialogTitle>
          <DialogDescription>{t('filterBar.dialogDescription')}</DialogDescription>
        </DialogHeader>
        <Form id={formId} form={draft} onSubmit={handleApply}>
          <FieldGroup>{children}</FieldGroup>
        </Form>
        <DialogFooter className="flex-row justify-end">
          <DialogClose asChild>
            <Button type="button" variant={BUTTON_VARIANTS.OUTLINE}>
              {t('actions.cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            {t('filterBar.apply')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
