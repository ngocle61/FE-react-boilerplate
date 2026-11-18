import { TECHNICIAN_COLOR_PALETTE } from '../constants/calendar.constant';

const FALLBACK_COLOR = '#2563eb';

export const getTechnicianColor = (technicianId: string): string => {
  let hash = 0;
  for (let index = 0; index < technicianId.length; index += 1) {
    hash = (hash * 31 + technicianId.charCodeAt(index)) >>> 0;
  }

  return TECHNICIAN_COLOR_PALETTE[hash % TECHNICIAN_COLOR_PALETTE.length] ?? FALLBACK_COLOR;
};
