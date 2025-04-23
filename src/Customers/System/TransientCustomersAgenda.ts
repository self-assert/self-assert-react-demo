import { Ruleset } from 'self-assert';
import { Customer } from '../Customer';
import { CustomersAgenda } from './CustomersAgenda';
import { Time } from '../../Time/Time';

export class TransientCustomersAgenda extends CustomersAgenda {
  protected customers: Customer[];

  constructor() {
    super();
    this.customers = [
      Customer.named('John', 'Doe', 1, Time.at(9, 0, 0), Time.at(17, 0, 0)),
    ];
  }

  async getCustomers() {
    return this.customers;
  }

  async add(aCustomerToAdd: Customer) {
    await this.doesNotDuplicateDNIInquiry().mustHold(aCustomerToAdd);

    this.customers.push(aCustomerToAdd);
  }

  async update(anOriginalCustomer: Customer, aNewCustomer: Customer) {
    await Ruleset.workOn(
      this.customerIsRegisteredInquiry().evaluateFor(anOriginalCustomer),
      this.doesNotDuplicateDNIInquiry().evaluateFor(aNewCustomer)
    );

    this.withCustomerIdentifiedAsIfNone(
      anOriginalCustomer.getDNI(),
      (customerToUpdate) => customerToUpdate.syncWith(aNewCustomer),
      () => null
    );
  }

  async removeCustomerIdentifiedAs(aDNI: number) {
    this.withCustomerIdentifiedAsIfNone(
      aDNI,
      (customerToRemove) => this.removeCustomer(customerToRemove),
      () => null
    );
  }

  async withCustomerIdentifiedAsIfNone<ReturnType>(
    aDNI: number,
    foundClosure: (aCustomer: Customer) => ReturnType,
    noneClosure: () => ReturnType
  ) {
    const foundCustomer = this.customers.find((customer) =>
      customer.isIdentifiedAs(Number(aDNI))
    );

    if (foundCustomer === undefined) return noneClosure();
    else return foundClosure(foundCustomer);
  }

  includes(aCustomer: Customer) {
    return this.customers.includes(aCustomer);
  }

  mapCustomers<Mapped>(aMappingClosure: (aCustomer: Customer) => Mapped) {
    return this.customers.map(aMappingClosure);
  }

  removeCustomer(customerToRemove: Customer) {
    const indexOfCustomerToRemove = this.customers.indexOf(customerToRemove);
    this.customers.splice(indexOfCustomerToRemove, 1);
  }
}
