import {
  useBrokenRulesDescriptions,
  type FormFieldProps,
} from '@self-assert/react';
import type { DraftAssistant } from 'self-assert';
import { FormField } from './FormField';

interface InnerModelFormFieldProps<Model extends string>
  extends FormFieldProps<Model> {
  draftAssistant: DraftAssistant & {
    innerAssistant: () => DraftAssistant<Model>;
  };
}

export function InnerModelFormField<Model extends string>({
  draftAssistant,
  ...props
}: InnerModelFormFieldProps<Model>) {
  const brokenRules = useBrokenRulesDescriptions(draftAssistant);
  const innerAssistant = draftAssistant.innerAssistant();

  return (
    <FormField
      draftAssistant={innerAssistant}
      {...props}
      brokenRulesDescriptions={brokenRules}
    />
  );
}
