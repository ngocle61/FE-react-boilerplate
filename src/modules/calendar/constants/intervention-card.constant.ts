export const INTERVENTION_CARD_VARIANTS = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export const INTERVENTION_CARD_ACTIONS_OFFSET = {
  [INTERVENTION_CARD_VARIANTS.GRID]: 'top-1.25 right-2.25',
  [INTERVENTION_CARD_VARIANTS.LIST]: 'top-2.25 right-2.25',
} as const;

export const INTERVENTION_CARD_TITLE_ACTION_INSETS: readonly string[] = ['', 'pe-5', 'pe-10'];

export const CHAT_CONTEXT_LABEL_SEPARATOR = ' · ';
