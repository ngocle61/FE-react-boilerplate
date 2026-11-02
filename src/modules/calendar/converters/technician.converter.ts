import type { UserSummaryDto } from '@/core/types/user.dto';

export const technicianConverter = {
  toOptions: (technicians: UserSummaryDto[]): ValueOption<string>[] =>
    technicians.map((technician) => ({ value: technician.id, label: technician.fullName })),
};
