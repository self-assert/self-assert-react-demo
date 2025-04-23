import { Link, useParams } from 'react-router';

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

interface EditCustomerViewState extends SystemActionViewState {
  formCompletionAssistant: CustomerDraftAssistant;
  system: CustomersAgenda;
  customerToEdit?: Customer;
}

interface EditCustomerViewProps extends SystemViewProps {
  customerDNI: number;
}

class EditCustomerViewWrapped extends SystemActionView<
  EditCustomerViewProps,
  EditCustomerViewState
> {
  constructor(props: EditCustomerViewProps) {
    super(props);

    const redirect = this.state.redirect;
    this.state = {
      redirect: redirect,
      system: props.system.getCustomersAgenda(),
      redirectTo: '/customers',
      formCompletionAssistant: CustomerView.createFormAssistant(
        DraftAssistant.topLevelModelFromContainer(),
        []
      ),
    };
    this.state.formCompletionAssistant.dniAssistant.addLabelId(
      CustomersAgenda.duplicatedDNIAID
    );
  }

  async componentDidMount() {
    this.state.system.withCustomerIdentifiedAsIfNone(
      this.props.customerDNI,
      (customerToEdit) => {
        this.state.formCompletionAssistant.setModel(customerToEdit);
        this.setState((state) => {
          return { ...state, customerToEdit };
        });
      },
      () => {
        this.state.formCompletionAssistant.addBrokenRule(
          this.state.system.customerIsRegisteredInquiry()
        );
        this.setState((state) => state);
      }
    );
  }

  modifyClicked = async () => {
    await this.state.formCompletionAssistant.withCreatedModelDo(
      (customer) => this.modifyWith(customer),
      () => null
    );

    this.setState((state) => state);
  };

  modifyWith = (customer: Customer) => {
    return this.executeSystemAction(
      () => this.state.system.update(this.state.customerToEdit!, customer),
      this.state.formCompletionAssistant
    );
  };

  render() {
    return (
      <div className="container mt-3" style={{ maxWidth: '700px' }}>
        {this.renderRedirect()}
        <div className="card p-3 shadow-sm">
          <form>
            <CustomerView
              formCompletionAssistant={this.state.formCompletionAssistant}
            />
          </form>
          <div className="mt-3 d-flex gap-2">
            <Button className="btn btn-success" onClick={this.modifyClicked}>
              Modify
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

export const EditCustomerView = (
  props: Omit<EditCustomerViewProps, 'customerDNI'>
) => {
  const { dni } = useParams();
  return <EditCustomerViewWrapped customerDNI={Number(dni)} {...props} />;
};
