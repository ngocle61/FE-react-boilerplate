import { useQuery } from '@tanstack/react-query';

import { technicianConverter } from '../converters/technician.converter';
import { technicianQueries } from '../queries/technician.queries';

export const useTechnicianOptionsQuery = () =>
  useQuery({ ...technicianQueries.list(), select: technicianConverter.toOptions });
