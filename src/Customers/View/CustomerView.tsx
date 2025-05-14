import React from 'react';
import {
  FieldDraftAssistant,
  IntegerDraftAssistant,
  SectionDraftAssistant,
} from 'self-assert';

import { Customer } from '../Customer';
import { TimeDraftAssistant, TimeView } from '../../Time/View/TimeView';
import { Time } from '../../Time/Time';
import { FormField } from '../../GenericComponents/FormField';
import { InnerModelFormField } from '../../GenericComponents/InnerModelFormField';
import { ErrorMessage } from '../../GenericComponents/ErrorMessage';

export type CustomerDraftAssistant<ContainerModel = any> =
  SectionDraftAssistant<
    Customer,
    ContainerModel,
    [
      firstName: string,
      lastName: string,
      dni: number,
      fromWorkingHours: Time,
      toWorkingHours: Time
    ]
  > & {
    firstNameAssistant: FieldDraftAssistant<Customer, string>;
    lastNameAssistant: FieldDraftAssistant<Customer, string>;
    dniAssistant: IntegerDraftAssistant<Customer>;
    fromWorkingHoursAssistant: TimeDraftAssistant<Customer>;
    toWorkingHoursAssistant: TimeDraftAssistant<Customer>;
  };

interface CustomerViewProps<ContainerModel> {
  draftAssistant: CustomerDraftAssistant<ContainerModel>;
}

export class CustomerView<ContainerModel> extends React.Component<
  CustomerViewProps<ContainerModel>,
  { rulesOnServer: boolean }
> {
  static createFormAssistant<ContainerModel>(
    getterFromContainerModel: (model: ContainerModel) => Customer,
    validateRulesOnServer = false
  ): CustomerDraftAssistant<ContainerModel> {
    console.log(
      `Customer rules will be evaluated on: ${
        validateRulesOnServer ? 'server' : 'client'
      }`
    );

    const firstNameAssistant = this.createFirstNameAssistant();
    const lastNameAssistant = this.createLastNameAssistant();
    const dniAssistant = this.createDNIAssistant();

    const fromWorkingHoursAssistant = this.createFromWorkingHoursAssistant();
    const toWorkingHoursAssistant = this.createToWorkingHoursAssistant();

    const customerAssistant = SectionDraftAssistant.with(
      [
        firstNameAssistant,
        lastNameAssistant,
        dniAssistant,
        fromWorkingHoursAssistant,
        toWorkingHoursAssistant,
      ],
      (firstName, lastName, dni, fromWorkingHours, toWorkingHours) => {
        return validateRulesOnServer
          ? new Customer(
              firstName,
              lastName,
              dni,
              fromWorkingHours,
              toWorkingHours
            )
          : Customer.named(
              firstName,
              lastName,
              dni,
              fromWorkingHours,
              toWorkingHours
            );
      },
      getterFromContainerModel,
      []
    );

    return Object.assign(customerAssistant, {
      firstNameAssistant,
      lastNameAssistant,
      dniAssistant,
      fromWorkingHoursAssistant,
      toWorkingHoursAssistant,
    });
  }

  static createFromWorkingHoursAssistant() {
    return TimeView.createFormAssistant<Customer>((customer) =>
      customer.getFromWorkingHours()
    );
  }

  static createToWorkingHoursAssistant() {
    return TimeView.createFormAssistant<Customer>((customer) =>
      customer.getToWorkingHours()
    );
  }

  static createDNIAssistant() {
    return IntegerDraftAssistant.for<Customer>(Customer.dniAID, (customer) =>
      customer.getDNI()
    );
  }

  static createLastNameAssistant() {
    return FieldDraftAssistant.handling<Customer>(
      Customer.lastNameAID,
      (customer) => customer.getLastName()
    );
  }

  static createFirstNameAssistant() {
    return FieldDraftAssistant.handling<Customer>(
      Customer.firstNameAID,
      (customer) => customer.getFirstName()
    );
  }

  constructor(props: CustomerViewProps<ContainerModel>) {
    super(props);
    this.state = {
      rulesOnServer: false,
    };
  }

  render() {
    const { draftAssistant } = this.props;

    return (
      <>
        <div className="mb-3">
          <FormField
            labelText="First Name"
            inputProps={{ name: 'first-name', placeholder: 'First Name' }}
            labelProps={{ htmlFor: 'first-name' }}
            draftAssistant={draftAssistant.firstNameAssistant}
          />
        </div>
        <div className="mb-3">
          <FormField
            labelText="Last Name"
            inputProps={{ name: 'last-name', placeholder: 'Last Name' }}
            labelProps={{ htmlFor: 'last-name' }}
            draftAssistant={draftAssistant.lastNameAssistant}
          />
        </div>
        <div className="mb-3">
          <InnerModelFormField
            labelText="DNI"
            inputProps={{ name: 'dni', placeholder: 'DNI' }}
            labelProps={{ htmlFor: 'dni' }}
            draftAssistant={draftAssistant.dniAssistant}
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working From</label>
            <TimeView
              draftAssistant={draftAssistant.fromWorkingHoursAssistant}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">To</label>
            <TimeView draftAssistant={draftAssistant.toWorkingHoursAssistant} />
          </div>
        </div>
        <ErrorMessage draftAssistant={draftAssistant} />
      </>
    );
  }
}
