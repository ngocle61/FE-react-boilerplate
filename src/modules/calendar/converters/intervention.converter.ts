import { addMinutes } from 'date-fns';

import { INTERVENTION_STATUSES } from '@/core/constants/intervention.constant';
import type {
  CreateInterventionPayload,
  InterventionDto,
  UpdateInterventionPayload,
} from '@/core/types/intervention.dto';

import { UNASSIGNED_TECHNICIAN_VALUE } from '../constants/calendar.constant';
import type { InterventionFormValues } from '../types/intervention-form.type';
import type { InterventionRow } from '../types/intervention-row.type';
import { combineDateAndTime, splitDateAndTime } from '../utils/datetime.util';

export const interventionConverter = {
  toRow: (dto: InterventionDto): InterventionRow => {
    const startsAt = dto.startsAt ? new Date(dto.startsAt) : null;

    return {
      id: dto.id,
      type: dto.type,
      status: dto.status,
      startsAt,
      endsAt: startsAt ? addMinutes(startsAt, dto.durationMinutes) : null,
      durationMinutes: dto.durationMinutes,
      isUrgent: dto.isUrgent,
      notes: dto.notes,
      clientName: dto.client.name,
      clientPhone: dto.client.phone,
      clientAddress:
        [dto.client.addressLine, dto.client.postalCode, dto.client.city]
          .filter(Boolean)
          .join(', ') || null,
      technicianId: dto.technician?.id ?? null,
      technicianName: dto.technician?.fullName ?? null,
      raw: dto,
    };
  },

  toRows: (dtos: InterventionDto[]): InterventionRow[] => dtos.map(interventionConverter.toRow),

  toFormValues: (dto: InterventionDto): InterventionFormValues => {
    const { date, time } = splitDateAndTime(dto.startsAt);

    return {
      clientId: dto.client.id,
      newClientName: '',
      newClientPhone: '',
      newClientEmail: '',
      type: dto.type,
      technicianId: dto.technician?.id ?? UNASSIGNED_TECHNICIAN_VALUE,
      startsAtDate: date,
      startsAtTime: time,
      durationMinutes: String(dto.durationMinutes),
      isUrgent: dto.isUrgent,
      notes: dto.notes ?? '',
      status: dto.status,
    };
  },

  toCreatePayload: (
    values: InterventionFormValues,
    clientId: string,
  ): CreateInterventionPayload => ({
    clientId,
    type: values.type,
    technicianId: values.technicianId === UNASSIGNED_TECHNICIAN_VALUE ? null : values.technicianId,
    startsAt: combineDateAndTime(values.startsAtDate, values.startsAtTime),
    durationMinutes: Number(values.durationMinutes),
    isUrgent: values.isUrgent,
    notes: values.notes || undefined,
  }),

  toUpdatePayload: (
    values: InterventionFormValues,
    clientId: string,
  ): UpdateInterventionPayload => {
    const payload = interventionConverter.toCreatePayload(values, clientId);

    return {
      ...payload,
      notes: values.notes || null,
      status: values.status,
      ...(values.status === INTERVENTION_STATUSES.TO_SCHEDULE
        ? { startsAt: null, technicianId: null }
        : {}),
    };
  },
};
