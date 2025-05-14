import {
  FormField as SelfAssertFormField,
  type FormFieldProps,
} from '@self-assert/react';
import { ErrorMessage } from './ErrorMessage';

export const FormField = <Model extends string>({
  inputProps,
  labelProps,
  showErrorMessage = true,
  ...props
}: FormFieldProps<Model>) => {
  return (
    <>
      <SelfAssertFormField
        className="field"
        inputProps={{ className: 'form-control', ...inputProps }}
        labelProps={{ className: 'form-label', ...labelProps }}
        {...props}
        showErrorMessage={false}
      />
      {showErrorMessage && (
        <ErrorMessage draftAssistant={props.draftAssistant} />
      )}
    </>
  );
};
