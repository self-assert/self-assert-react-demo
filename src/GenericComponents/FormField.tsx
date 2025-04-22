import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { DraftAssistant } from 'self-assert';

interface FormFieldProps {
  labelText: string;
  inputName: string;
  inputPlaceHolder: string;
  formCompletionAssistant: DraftAssistant<string, never>;
  doNotShowErrorMessage: boolean;
}

export type FormFieldState = Pick<FormFieldProps, 'formCompletionAssistant'>;

export class FormField extends React.Component<FormFieldProps, FormFieldState> {
  constructor(props: FormFieldProps) {
    super(props);
    this.state = {
      formCompletionAssistant: props.formCompletionAssistant,
    };
  }

  render() {
    return (
      <div className="field">
        {this.label()}
        <input
          type="text"
          name={this.props.inputName}
          placeholder={this.props.inputPlaceHolder}
          value={this.getModel()}
          onChange={this.onChange}
        />
        {this.errorMessage()}
      </div>
    );
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    this.setState((state) => {
      this.setModel(state, e);
      return state;
    });
  };

  errorMessage() {
    if (this.props.doNotShowErrorMessage) return null;

    return (
      <ErrorMessage
        formCompletionAssistant={this.props.formCompletionAssistant}
      />
    );
  }

  label() {
    if (this.props.labelText === null) return null;

    return <label>{this.props.labelText}</label>;
  }

  setModel(state: FormFieldState, e: React.ChangeEvent<HTMLInputElement>) {
    state.formCompletionAssistant.setModel(e.target.value);
  }

  getModel() {
    return this.props.formCompletionAssistant.getModel();
  }
}
