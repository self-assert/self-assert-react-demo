import React from 'react';
import { DraftAssistant } from 'self-assert';

interface ErrorMessageProps {
  formCompletionAssistant: DraftAssistant<any, never>;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  errorDescriptions() {
    let counter = 0;
    return this.props.formCompletionAssistant
      .failedAssertionsDescriptions()
      .map((description) => <li key={counter++}>{description}</li>);
  }

  render() {
    if (!this.hasFailedAssertionsToShow()) return null;

    return (
      <div className="ui bottom attached negative message">
        <ul>{this.errorDescriptions()}</ul>
      </div>
    );
  }

  hasFailedAssertionsToShow() {
    return this.props.formCompletionAssistant.hasFailedAssertions();
  }
}
