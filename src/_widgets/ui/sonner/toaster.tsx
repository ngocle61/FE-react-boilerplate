import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

import { TOASTER_CLOSE_LABEL, TOASTER_STYLE, TOASTER_THEMES } from './constants';
import type { ToasterProps } from './types';

export const Toaster = ({
  theme = TOASTER_THEMES.SYSTEM,
  closeButton = true,
  closeLabel = TOASTER_CLOSE_LABEL,
  ...props
}: ToasterProps) => (
  <Sonner
    theme={theme}
    className="toaster group"
    closeButton={closeButton}
    icons={{
      success: <CircleCheckIcon aria-hidden className="size-4 text-primary" />,
      info: <InfoIcon aria-hidden className="size-4 text-info-foreground" />,
      warning: <TriangleAlertIcon aria-hidden className="size-4 text-warning-foreground" />,
      error: <OctagonXIcon aria-hidden className="size-4 text-destructive" />,
      loading: <Loader2Icon aria-hidden className="size-4 animate-spin text-muted-foreground" />,
      close: <XIcon aria-hidden className="size-4" />,
    }}
    style={TOASTER_STYLE}
    toastOptions={{
      closeButtonAriaLabel: closeLabel,
      classNames: {
        toast: 'font-sans shadow-toast pr-12!',
        description: 'text-muted-foreground',
        closeButton:
          'top-3! right-3! left-auto! size-7! transform-none! rounded-md! border-0! bg-transparent! text-muted-foreground! transition-colors hover:bg-accent! hover:text-foreground! focus-visible:shadow-none! focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none',
      },
    }}
    {...props}
  />
);
