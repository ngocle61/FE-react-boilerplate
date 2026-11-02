import type { FieldValues, Path } from 'react-hook-form';

export type ServerFieldMap<TValues extends FieldValues> = Partial<Record<string, Path<TValues>>>;
