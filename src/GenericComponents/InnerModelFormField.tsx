import { DraftAssistant } from 'self-assert';
import { FormField, FormFieldProps } from './FormField';

interface InnerModelFormFieldProps extends FormFieldProps {
  formCompletionAssistant: DraftAssistant & {
    getInnerModel: () => string;
    setInnerModel: (value: string) => void;
  };
}

export class InnerModelFormField extends FormField {
  declare props: InnerModelFormFieldProps;

  override setModel(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.formCompletionAssistant.setInnerModel(e.target.value);
  }

  getModel() {
    return this.props.formCompletionAssistant.getInnerModel();
  }
}
