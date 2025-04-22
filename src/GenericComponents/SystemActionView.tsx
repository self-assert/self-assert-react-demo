import React from 'react';
import { Navigate } from 'react-router';
import { RulesBroken, SectionDraftAssistant } from 'self-assert';
import { SystemViewProps } from '../Types';

export type SystemActionViewState = {
  redirect: boolean;
  redirectTo?: string;
};

export class SystemActionView<
  Props = SystemViewProps,
  State extends SystemActionViewState = SystemActionViewState
> extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: false,
    } as State;
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
    formCompletionAssistant: Pick<
      SectionDraftAssistant<unknown, unknown, unknown[]>,
      'routeFailedAssertionsOf'
    >
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
