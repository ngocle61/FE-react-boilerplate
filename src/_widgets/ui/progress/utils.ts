import { PROGRESS_MAX, PROGRESS_MIN } from './constants';

export const toProgressTransform = (value: Nillable<number>) => {
  const percent = Math.min(Math.max(value ?? PROGRESS_MIN, PROGRESS_MIN), PROGRESS_MAX);
  return `translateX(-${PROGRESS_MAX - percent}%)`;
};
