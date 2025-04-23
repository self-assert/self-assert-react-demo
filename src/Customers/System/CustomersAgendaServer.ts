import { http, HttpResponse, JsonBodyType, StrictRequest } from 'msw';
import { CustomersAgenda } from './CustomersAgenda';
import { RulesBroken } from 'self-assert';
import { Customer, CustomerAsJson } from '../Customer';

export class CustomersAgendaServer {
  constructor(
    protected server: typeof import('../../Server').worker,
    protected baseUrl: string,
    protected customersAgenda: CustomersAgenda
  ) {
    this.registerOn(server);
  }

  registerOn(server: typeof import('../../Server').worker) {
    server.use(
      http.get(`${this.baseUrl}/customers`, () => this.getCustomers()),
      http.post(`${this.baseUrl}/customers/new`, ({ request }) =>
        this.add(request)
      ),
      http.post(`${this.baseUrl}/customers/update`, ({ request }) =>
        this.update(request)
      ),
      http.get(`${this.baseUrl}/customer/:dni`, ({ params }) =>
        this.getCustomerIdentifiedAs(params.dni as string)
      ),
      http.delete(`${this.baseUrl}/customer/:dni`, ({ params }) =>
        this.removeCustomerIdentifiedAs(params.dni as string)
      )
    );
  }

  async getCustomers() {
    return HttpResponse.json(await this.customersAgenda.getCustomers());
  }

  async add(request: StrictRequest<JsonBodyType>) {
    const customerAsJson = (await request.json()) as CustomerAsJson;
    return this.executeSystemAction(() => {
      const customerToAdd = Customer.fromJson(customerAsJson);
      return this.customersAgenda.add(customerToAdd);
    });
  }

  async update(request: StrictRequest<JsonBodyType>) {
    const customersAsJson = (await request.json()) as UpdateRequestBody;

    return this.executeSystemAction(() => {
      const customerToUpdate = Customer.fromJson(
        customersAsJson.originalCustomer
      );
      const updatedCustomer = Customer.fromJson(customersAsJson.newCustomer);

      return this.customersAgenda.update(customerToUpdate, updatedCustomer);
    });
  }

  async getCustomerIdentifiedAs(aDNI: string) {
    return this.customersAgenda.withCustomerIdentifiedAsIfNone(
      Number(aDNI),
      (foundCustomer) => HttpResponse.json(foundCustomer),
      () => HttpResponse.json({ error: 'Customer not found' }, { status: 404 })
    );
  }

  async removeCustomerIdentifiedAs(aDNI: string) {
    return this.executeSystemAction(() =>
      this.customersAgenda.removeCustomerIdentifiedAs(Number(aDNI))
    );
  }

  /**
   * This is a big simplification, but it's enough for the demo
   */
  protected async executeSystemAction(systemAction: () => Promise<void>) {
    try {
      await systemAction();
      return HttpResponse.json({});
    } catch (error) {
      if (error instanceof RulesBroken) {
        return HttpResponse.json(error, { status: 400 });
      }
      return HttpResponse.json(error as Error, { status: 500 });
    }
  }
}

export interface UpdateRequestBody {
  originalCustomer: CustomerAsJson;
  newCustomer: CustomerAsJson;
}
