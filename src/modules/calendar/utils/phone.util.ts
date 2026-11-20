export const toTelHref = (phone: string): string => `tel:${phone.replaceAll(/[^\d+]/g, '')}`;
