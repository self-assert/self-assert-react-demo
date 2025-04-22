import { ALaGorraSystem } from './ALaGorraSystem';
import { TransientCustomersAgenda } from '../Customers/System/TransientCustomersAgenda';
import { TransientSalesBook } from '../Accounting/System/TransientSalesBook';

export class ALaGorraTransientSystem implements ALaGorraSystem {
  protected customersAgenda: TransientCustomersAgenda;
  protected salesBook: TransientSalesBook;

  constructor() {
    this.customersAgenda = new TransientCustomersAgenda();
    this.salesBook = new TransientSalesBook();
  }

  getCustomersAgenda() {
    return this.customersAgenda;
  }

  getSalesBook() {
    return this.salesBook;
  }
}
