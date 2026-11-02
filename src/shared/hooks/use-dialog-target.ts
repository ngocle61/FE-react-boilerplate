import { useState } from 'react';

export const useDialogTarget = <TItem>() => {
  const [target, setTarget] = useState<Nullable<TItem>>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (item: TItem) => {
    setTarget(item);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const onOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) close();
  };

  return { target, isOpen, open, close, onOpenChange };
};
