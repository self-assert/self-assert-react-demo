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

interface AddCustomerViewState extends SystemActionViewState {
  formCompletionAssistant: CustomerDraftAssistant<never>;
  system: CustomersAgenda;
}
export class AddCustomerView extends SystemActionView<
  SystemViewProps,
  AddCustomerViewState
> {
  constructor(props: SystemViewProps) {
    super(props);

    const redirect = this.state.redirect;
    this.state = {
      redirect: redirect,
      system: props.system.getCustomersAgenda(),
      redirectTo: '/customers',
      formCompletionAssistant: CustomerView.createFormAssistant(
        () => null as never,
        []
      ),
    };
    this.state.formCompletionAssistant.dniAssistant.addAssertionId(
      CustomersAgenda.duplicatedDNIAID
    );
  }

  addClicked = () => {
    this.setState((state) => {
      state.formCompletionAssistant.withCreatedModelDo(
        (customer) => this.addCustomer(customer),
        () => null
      );
      return state;
    });
  };

  addCustomer(customer: Customer) {
    this.executeSystemAction(
      () => this.state.system.add(customer),
      this.state.formCompletionAssistant
    );
  }

  render() {
    return (
      <div className="container mt-3" style={{ maxWidth: '500px' }}>
        {this.renderRedirect()}
        <div className="card p-3 shadow-sm">
          <form>
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
