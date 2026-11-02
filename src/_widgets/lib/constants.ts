import type { CreateCnInput } from 'cn';

export const CN_CONFIG = {
  extend: {
    theme: {
      spacing: ['input', 'button'],
      radius: ['card'],
      shadow: ['default', 'card', 'toast'],
      text: ['md'],
    },
  },
} satisfies CreateCnInput;

export const ICON_PLACEMENTS = {
  INLINE_START: 'inline-start',
  INLINE_END: 'inline-end',
} as const;
