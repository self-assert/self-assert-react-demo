import { DraftAssistant } from 'self-assert';
import { FormField } from './FormField';

interface InnerModelFormFieldState {
  formCompletionAssistant: DraftAssistant<any, any> & {
    getInnerModel: () => string;
    setInnerModel: (value: string) => void;
  };
}

export class InnerModelFormField extends FormField {
  declare state: InnerModelFormFieldState;

  override setModel(
    state: InnerModelFormFieldState,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    state.formCompletionAssistant.setInnerModel(e.target.value);
  }

  getModel() {
    return this.state.formCompletionAssistant.getInnerModel();
  }
}
