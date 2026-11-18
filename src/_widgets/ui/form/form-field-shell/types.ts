import type { ReactNode } from 'react';

import type { FieldProps } from '../../field/types';
import type { FieldShellProps } from '../types';

export interface FormFieldShellProps extends FieldShellProps {
  orientation?: FieldProps['orientation'];
  children: ReactNode;
}
