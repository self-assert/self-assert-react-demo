import React from 'react';
import { Customer } from '../Customer';

import { FormField } from '../../GenericComponents/FormField';
import { ErrorMessage } from '../../GenericComponents/ErrorMessage';
import { TimeDraftAssistant, TimeView } from '../../Time/View/TimeView';
import {
  FieldDraftAssistant,
  IntegerDraftAssistant,
  SectionDraftAssistant,
} from 'self-assert';
import { Time } from '../../Time/Time';
import { InnerModelFormField } from '../../GenericComponents/InnerModelFormField';

export type CustomerDraftAssistant<ContainerModel> = SectionDraftAssistant<
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

export class CustomerView<ContainerModel> extends React.Component<{
  formCompletionAssistant: CustomerDraftAssistant<ContainerModel>;
}> {
  static createFormAssistant<ContainerModel>(
    getterFromContainerModel: (model: ContainerModel) => Customer,
    assertionsId = []
  ): CustomerDraftAssistant<ContainerModel> {
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
      (firstName, lastName, dni, fromWorkingHours, toWorkingHours) =>
        // Para que la validación se haga en el server, reemplazar
        // Customer.name por new Customer. Esto solo es válido si se está usando el server
        Customer.named(
          firstName,
          lastName,
          dni,
          fromWorkingHours,
          toWorkingHours
        ),
      getterFromContainerModel,
      assertionsId
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

  render() {
    const { formCompletionAssistant } = this.props;

    return (
      <>
        <div className="mb-3">
          <FormField
            labelText="First Name"
            inputName="first-name"
            inputPlaceHolder="First Name"
            formCompletionAssistant={formCompletionAssistant.firstNameAssistant}
          />
        </div>
        <div className="mb-3">
          <FormField
            labelText="Last Name"
            inputName="last-name"
            inputPlaceHolder="Last Name"
            formCompletionAssistant={formCompletionAssistant.lastNameAssistant}
          />
        </div>
        <div className="mb-3">
          <InnerModelFormField
            labelText="DNI"
            inputName="dni"
            inputPlaceHolder="DNI"
            formCompletionAssistant={formCompletionAssistant.dniAssistant}
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Working From</label>
            <TimeView
              formCompletionAssistant={
                formCompletionAssistant.fromWorkingHoursAssistant
              }
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">To</label>
            <TimeView
              formCompletionAssistant={
                formCompletionAssistant.toWorkingHoursAssistant
              }
            />
          </div>
        </div>
        <ErrorMessage formCompletionAssistant={formCompletionAssistant} />
      </>
    );
  }
}
