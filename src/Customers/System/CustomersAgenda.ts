import { Inquiry } from 'self-assert';
import { Customer } from '../Customer';

export abstract class CustomersAgenda {
  static duplicatedDNIAID = 'duplicatedDNIAID';
  static DUPLICATED_DNI = 'There is another customer with that DNI';
  static notExistingCustomerAID = 'notExistingCustomerAID';
  static NOT_EXISTING_CUSTOMER = 'Customer does not exist';

  abstract withCustomerIdentifiedAsIfNone<ReturnType>(
    aDNI: number,
    foundClosure: (aCustomer: Customer) => ReturnType,
    noneClosure: () => ReturnType
  ): Promise<ReturnType>;

  abstract getCustomers(): Promise<Customer[]>;

  abstract add(aCustomerToAdd: Customer): Promise<void>;

  abstract update(
    anOriginalCustomer: Customer,
    aNewCustomer: Customer
  ): Promise<void>;

  abstract removeCustomerIdentifiedAs(aDNI: number): Promise<void>;

  doesNotDuplicateDNIInquiry(exception?: Customer) {
    return Inquiry.requiring<Customer>(
      CustomersAgenda.duplicatedDNIAID,
      CustomersAgenda.DUPLICATED_DNI,
      async (aCustomerToAdd) =>
        exception?.isIdentifiedAs(aCustomerToAdd.getDNI()) ||
        !(await this.hasCustomerIdentifiedAs(aCustomerToAdd.getDNI()))
    );
  }

  customerIsRegisteredInquiry() {
    return Inquiry.requiring<Customer>(
      CustomersAgenda.notExistingCustomerAID,
      CustomersAgenda.NOT_EXISTING_CUSTOMER,
      (anOriginalCustomer) =>
        this.hasCustomerIdentifiedAs(anOriginalCustomer.getDNI())
    );
  }

  hasCustomerIdentifiedAs(aDNI: number) {
    return this.withCustomerIdentifiedAsIfNone(
      aDNI,
      () => true,
      () => false
    );
  }
}
