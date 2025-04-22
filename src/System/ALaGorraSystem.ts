import { SalesBook } from '../Accounting/System/SalesBook';
import { CustomersAgenda } from '../Customers/System/CustomerAgenda';

export interface ALaGorraSystem {
  getCustomersAgenda: () => CustomersAgenda;

  getSalesBook: () => SalesBook;
}
