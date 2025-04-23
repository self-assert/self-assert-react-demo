import { RulesBroken } from 'self-assert';
import { Customer, CustomerAsJson } from '../Customer';
import { CustomersAgenda } from './CustomersAgenda';

export class CustomersAgendaClient extends CustomersAgenda {
  constructor(protected baseUrl: string) {
    super();
  }

  async getCustomers() {
    const response = (await (
      await fetch(`${this.baseUrl}/customers`)
    ).json()) as CustomerAsJson[];

    return response.map((customerAsJson) => Customer.fromJson(customerAsJson));
  }

  async add(aCustomerToAdd: Customer) {
    const response = await fetch(`${this.baseUrl}/customers/new`, {
      method: 'POST',
      body: JSON.stringify(aCustomerToAdd),
    });

    await this.handleRulesBrokenIfAny(response);
  }

  protected async handleRulesBrokenIfAny(response: Response) {
    if (response.status === 400) {
      throw RulesBroken.fromJson(await response.json());
    }
  }

  async update(anOriginalCustomer: Customer, aNewCustomer: Customer) {
    const response = await fetch(`${this.baseUrl}/customers/update`, {
      method: 'POST',
      body: JSON.stringify({
        originalCustomer: anOriginalCustomer,
        newCustomer: aNewCustomer,
      }),
    });

    await this.handleRulesBrokenIfAny(response);
  }

  async removeCustomerIdentifiedAs(aDNI: number) {
    await fetch(`${this.baseUrl}/customer/${aDNI}`, {
      method: 'DELETE',
    });
  }

  async withCustomerIdentifiedAsIfNone<ReturnType>(
    aDNI: number,
    foundClosure: (aCustomer: Customer) => ReturnType,
    noneClosure: () => ReturnType
  ) {
    const response = await fetch(`${this.baseUrl}/customer/${aDNI}`);

    if (response.status === 404) return noneClosure();
    else {
      const foundCustomer = Customer.fromJson(await response.json());
      return foundClosure(foundCustomer);
    }
  }
}
