import {
  ErrorMessage as SelfAssertErrorMessage,
  ErrorMessageProps,
} from '@self-assert/react';

export const ErrorMessage = (props: ErrorMessageProps) => (
  <SelfAssertErrorMessage className="alert alert-danger my-2" {...props} />
);
