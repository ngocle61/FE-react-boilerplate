import { FieldErrorList } from './field-error-list';
import type { FieldErrorProps } from './types';
import { toUniqueErrorMessages } from './utils';
import { cn } from '../../lib/cn';

export const FieldError = ({ className, children, errors = [], ...props }: FieldErrorProps) => {
  const messages = toUniqueErrorMessages(errors);

  if (!children && messages.length === 0) return null;

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-sm font-normal text-destructive', className)}
      {...props}
    >
      {children ?? <FieldErrorList messages={messages} />}
    </div>
  );
};
