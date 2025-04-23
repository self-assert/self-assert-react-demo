import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { DraftAssistant } from 'self-assert';

export interface FormFieldProps {
  labelText?: string;
  inputName: string;
  inputPlaceHolder: string;
  formCompletionAssistant: DraftAssistant;
  doNotShowErrorMessage?: boolean;
}

export class FormField extends React.Component<FormFieldProps> {
  render() {
    return (
      <div className="field">
        {this.label()}
        <input
          type="text"
          name={this.props.inputName}
          placeholder={this.props.inputPlaceHolder}
          className="form-control"
          value={this.getModel()}
          onChange={this.onChange}
        />
        {this.errorMessage()}
      </div>
    );
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    this.setModel(e);
    this.setState(() => ({}));
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

    return <label className="form-label">{this.props.labelText}</label>;
  }

  setModel(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.formCompletionAssistant.setModel(e.target.value);
  }

  getModel() {
    return this.props.formCompletionAssistant.getModel();
  }
}
