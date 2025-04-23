import { Link } from 'react-router';

import {
  SystemActionView,
  SystemActionViewState,
} from '../../GenericComponents/SystemActionView';
import { CustomerDraftAssistant, CustomerView } from './CustomerView';
import { SystemViewProps } from '../../Types';
import { CustomersAgenda } from '../System/CustomersAgenda';
import { Customer } from '../Customer';
import { Button } from 'react-bootstrap';
import { DraftAssistant } from 'self-assert';

interface AddCustomerViewState extends SystemActionViewState {
  formCompletionAssistant: CustomerDraftAssistant;
  system: CustomersAgenda;
}

interface AddCustomerViewProps extends SystemViewProps {
  rulesOnServer: boolean;
}

export class AddCustomerView extends SystemActionView<
  AddCustomerViewProps,
  AddCustomerViewState
> {
  constructor(props: AddCustomerViewProps) {
    super(props);

    const redirect = this.state.redirect;
    this.state = {
      redirect: redirect,
      system: props.system.getCustomersAgenda(),
      redirectTo: '/customers',
      formCompletionAssistant: CustomerView.createFormAssistant(
        DraftAssistant.topLevelModelFromContainer(),
        props.rulesOnServer
      ),
    };
  }

  componentDidUpdate(prevProps: Readonly<AddCustomerViewProps>): void {
    if (prevProps.rulesOnServer !== this.props.rulesOnServer) {
      const assistant = CustomerView.createFormAssistant(
        DraftAssistant.topLevelModelFromContainer(),
        this.props.rulesOnServer
      );
      this.setState({
        formCompletionAssistant: assistant,
      });
    }
  }

  addClicked = async () => {
    await this.state.formCompletionAssistant.withCreatedModelDo(
      (customer) => this.addCustomer(customer),
      () => null
    );

    this.setState((state) => state);
  };

  addCustomer = (customer: Customer) => {
    return this.executeSystemAction(
      () => this.state.system.add(customer),
      this.state.formCompletionAssistant
    );
  };

  render() {
    return (
      <div className="container mt-3" style={{ maxWidth: '700px' }}>
        {this.renderRedirect()}
        <div className="card p-3 shadow-sm">
          <form onSubmit={(e) => e.preventDefault()}>
            <CustomerView
              formCompletionAssistant={this.state.formCompletionAssistant}
            />
          </form>
          <div className="mt-3 d-flex gap-2">
            <Button className="btn btn-success" onClick={this.addClicked}>
              Add
            </Button>
            <Link className="btn btn-secondary" to={this.state.redirectTo!}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
