import { useQuery } from '@tanstack/react-query';

import { technicianQueries } from '../queries/technician.queries';

export const useTechniciansQuery = () => useQuery(technicianQueries.list());
