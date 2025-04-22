import React from 'react';
import { Navigate } from 'react-router';
import { RulesBroken, SectionDraftAssistant } from 'self-assert';

export class SystemActionView extends React.Component<
  unknown,
  { redirect: boolean; redirectTo?: string }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect && this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} />;
    }
  };

  async executeSystemAction(
    systemAction: () => Promise<void>,
    formCompletionAssistant: SectionDraftAssistant<any, any, any>
  ) {
    try {
      await systemAction();
      this.setRedirect();
    } catch (error) {
      if (error instanceof RulesBroken)
        this.setState((state) => {
          formCompletionAssistant.routeFailedAssertionsOf(error);
          return state;
        });
      else throw error;
    }
  }
}
