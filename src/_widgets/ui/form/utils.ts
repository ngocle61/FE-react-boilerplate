import { FIELD_LABEL_DISPLAYS, SR_ONLY_CLASS_NAME } from './constants';
import type { FieldAriaIds, FieldDescribedByState, FieldLabelDisplay } from './types';

export const toFieldAriaIds = (id: string): FieldAriaIds => ({
  controlId: id,
  descriptionId: `${id}-description`,
  errorId: `${id}-error`,
});

export const toDescribedBy = (
  ids: FieldAriaIds,
  { hasDescription, hasError }: FieldDescribedByState,
): Maybe<string> => {
  const describedBy = [hasDescription && ids.descriptionId, hasError && ids.errorId]
    .filter(Boolean)
    .join(' ');

  return describedBy || undefined;
};

export const toOptionControlId = (controlId: string, value: ID) => `${controlId}-${value}`;

export const toLabelClassName = (labelDisplay: Maybe<FieldLabelDisplay>): Maybe<string> =>
  labelDisplay === FIELD_LABEL_DISPLAYS.SR_ONLY ? SR_ONLY_CLASS_NAME : undefined;
