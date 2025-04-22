import { SalesBook } from '../Accounting/System/SalesBook';
import { CustomersAgenda } from '../Customers/System/CustomersAgenda';

export interface ALaGorraSystem {
  getCustomersAgenda: () => CustomersAgenda;

  getSalesBook: () => SalesBook;
}
