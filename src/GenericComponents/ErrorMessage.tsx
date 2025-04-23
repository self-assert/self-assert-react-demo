import React from 'react';
import { DraftAssistant } from 'self-assert';

interface ErrorMessageProps {
  formCompletionAssistant: DraftAssistant;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  errorDescriptions() {
    return this.props.formCompletionAssistant
      .brokenRulesDescriptions()
      .map((description, i) => <li key={i}>{description}</li>);
  }

  render() {
    if (!this.hasFailedAssertionsToShow()) return null;

    return (
      <div className="alert alert-danger mt-2">
        <ul className="mb-0">{this.errorDescriptions()}</ul>
      </div>
    );
  }

  hasFailedAssertionsToShow() {
    return this.props.formCompletionAssistant.hasBrokenRules();
  }
}
