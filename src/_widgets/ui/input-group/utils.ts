import type { MouseEvent } from 'react';

export const focusInputGroupControl = (event: MouseEvent<HTMLDivElement>) => {
  if ((event.target as HTMLElement).closest('button')) return;
  event.currentTarget.parentElement
    ?.querySelector<HTMLElement>('[data-slot=input-group-control]')
    ?.focus();
};
