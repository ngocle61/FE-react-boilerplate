import type { CSSProperties } from 'react';

export const TOASTER_CLOSE_LABEL = 'Close notification';

export const TOASTER_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const TOASTER_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
} as const;

export const TOASTER_STYLE = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
  '--border-radius': 'var(--radius)',
  '--success-bg': 'var(--success)',
  '--success-text': 'var(--success-foreground)',
  '--success-border': 'var(--success-border)',
  '--info-bg': 'var(--info)',
  '--info-text': 'var(--info-foreground)',
  '--info-border': 'var(--info-border)',
  '--warning-bg': 'var(--warning)',
  '--warning-text': 'var(--warning-foreground)',
  '--warning-border': 'var(--warning-border)',
  '--error-bg': 'var(--error)',
  '--error-text': 'var(--error-foreground)',
  '--error-border': 'var(--error-border)',
} as CSSProperties;
