import { CustomersAgendaClient } from '../Customers/System/CustomersAgendaClient';
import { ALaGorraSystem } from './ALaGorraSystem';
import { TransientSalesBook } from '../Accounting/System/TransientSalesBook';

export class ALaGorraSystemClient implements ALaGorraSystem {
  static baseUrl = 'http://localhost:3000';

  protected customersAgenda;
  protected salesBook;

  constructor() {
    this.customersAgenda = new CustomersAgendaClient(
      ALaGorraSystemClient.baseUrl
    );
    /**
     * Here should go the implementation of the sales book client
     */
    this.salesBook = new TransientSalesBook();
  }

  getCustomersAgenda() {
    return this.customersAgenda;
  }

  getSalesBook() {
    return this.salesBook;
  }
}
